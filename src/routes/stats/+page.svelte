<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { getMessage } from "$lib";
  import Head from "$lib/Head.svelte";
  import { m } from "$lib/paraglide/messages.js";
  import Chart, { type ChartOptions } from "chart.js/auto";
  import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";
  import dayjs from "dayjs";
  import { innerWidth } from "svelte/reactivity/window";

  type TimeSpan = "7d" | "30d" | "90d" | "180d" | "365d";

  let { data } = $props();
  let history = $derived<IHistoryStats[]>(data.history || []);
  let metadata = $derived<StatsMetadata>(data.meta ?? { message: "No metadata available", status: "unknown" });

  $effect(() => {
    console.log("history:", history);
    console.log("metadata:", metadata);
  });

  let ticketsCanvas = $state<any>();
  let serversCanvas = $state<any>();
  let usersCanvas = $state<any>();
  let ticketsChart: any;
  let serversChart: any;
  let usersChart: any;

  let timeSpan = $state<TimeSpan>((page.url.searchParams.get("span") || "30d") as TimeSpan);
  let chartContainerStyle = $derived.by(() => {
    // The chart width based on the time span selected
    if (innerWidth?.current && innerWidth.current < 640) {
      return "flex: 0 1 100%";
    }

    switch (timeSpan) {
      case "7d":
        return "flex: 0 1 25%";
      case "30d":
        return "flex: 0 1 40%";
      case "90d":
        return "flex: 0 1 50%";
      case "180d":
        return "flex: 0 1 80%";
      case "365d":
        return "flex: 0 1 100%";
      default:
        return "flex: 0 1 100%";
    }
  });

  function prepareDataForTimespan(): IHistoryStats[] {
    if (!timeSpan) return [];

    const days = parseInt(timeSpan);
    const startDate = dayjs().subtract(days, "day").startOf("day");
    const endDate = dayjs().endOf("day");

    console.log("Date range:", startDate.format(), "to", endDate.format());
    console.log("Raw history data:", history);

    // Generate complete date range
    const dateRange: string[] = [];
    for (let i = 0; i <= days; i++) {
      dateRange.push(startDate.add(i, "day").format("YYYY-MM-DD"));
    }

    // Create map of existing data
    const dataMap = new Map<string, IHistoryStats>();
    history.forEach((item, index) => {
      const itemDate = dayjs(item.timestamp);
      const dateKey = itemDate.format("YYYY-MM-DD");

      console.log(`Item ${index}:`, {
        timestamp: item.timestamp,
        itemDate: itemDate.format(),
        dateKey: dateKey,
        isAfterStart: itemDate.isAfter(startDate),
        isSameStart: itemDate.isSame(startDate, "day"),
        isBeforeEnd: itemDate.isBefore(endDate),
        isSameEnd: itemDate.isSame(endDate, "day"),
        passesFilter:
          (itemDate.isAfter(startDate) || itemDate.isSame(startDate, "day")) &&
          (itemDate.isBefore(endDate) || itemDate.isSame(endDate, "day")),
      });

      // Use isAfter or isSame for start date, and isBefore or isSame for end date
      if (itemDate.isAfter(startDate) || itemDate.isSame(startDate, "day")) {
        if (itemDate.isBefore(endDate) || itemDate.isSame(endDate, "day")) {
          console.log(`Adding item to map with key: ${dateKey}`);
          dataMap.set(dateKey, item);
        }
      }
    });

    console.log("Filtered data map:", dataMap);
    console.log("Generated date range:", dateRange);

    // Fill in missing dates with null/zero values
    const result = dateRange.map((date) => {
      const existing = dataMap.get(date);
      if (existing) {
        return existing;
      }

      // Create empty data point for missing dates
      return {
        timestamp: dayjs(date).toISOString(),
        tickets: null,
        guilds: null,
        users: null,
      } as any;
    });

    console.log("Final prepared data:", result);
    return result;
  }

  function formatLocaleDateString(date: Date): string {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  function generateChartdata(
    stats: IHistoryStats[],
    bgColor: string,
    borderColor: string,
    label: string,
    dataKey: keyof IHistoryStats,
  ) {
    return {
      datasets: [
        {
          label: label,
          data: stats.map((item) => ({
            x: formatLocaleDateString(dayjs(item.timestamp).toDate()),
            y: item[dataKey],
          })),
          backgroundColor: bgColor,
          borderColor: borderColor,
          borderWidth: 1,
          spanGaps: true, // This connects points across null values
        },
      ],
    };
  }

  const chartData = {
    tickets: (stats: IHistoryStats[]) =>
      generateChartdata(stats, "rgba(54, 162, 235, 0.2)", "rgba(54, 162, 235, 1)", m["stats.tickets"](), "tickets"),
    servers: (stats: IHistoryStats[]) =>
      generateChartdata(stats, "rgba(255, 99, 132, 0.2)", "rgba(255, 99, 132, 1)", m["stats.serverCount"](), "guilds"),
    users: (stats: IHistoryStats[]) =>
      generateChartdata(stats, "rgba(255, 206, 86, 0.2)", "rgba(255, 206, 86, 1)", m["stats.userCount"](), "users"),
  };

  // Update chartOptions to handle time scale properly:
  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
      axis: "x",
    },
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
        position: "nearest",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  $effect(() => {
    if (!browser) return;

    const cleanedStats = prepareDataForTimespan();

    if (ticketsChart) ticketsChart.destroy();
    if (serversChart) serversChart.destroy();
    if (usersChart) usersChart.destroy();

    // Create chart when component mounts
    ticketsChart = new Chart(ticketsCanvas, {
      type: "line",
      data: chartData.tickets(cleanedStats),
      options: chartOptions,
    });
    serversChart = new Chart(serversCanvas, {
      type: "line",
      data: chartData.servers(cleanedStats),
      options: chartOptions,
    });
    usersChart = new Chart(usersCanvas, {
      type: "line",
      data: chartData.users(cleanedStats),
      options: chartOptions,
    });

    // Cleanup function
    return () => {
      if (ticketsChart) {
        ticketsChart.destroy();
      }
      if (serversChart) {
        serversChart.destroy();
      }
      if (usersChart) {
        usersChart.destroy();
      }
    };
  });

  $effect(() => {
    if (metadata) {
      console.log("Page metadata:", metadata);
    } else {
      console.warn("No metadata available in page data");
    }
  });
</script>

<Head
  seo_config={{
    title: getMessage(`stats.pageTitle-${timeSpan}`)(),
    description: m["stats.pageDescription"](),
  }}
/>

<div class="container-wrapper">
  <fieldset class="fieldset">
    <legend class="fieldset-legend">{m["stats.timeRange"]()}</legend>
    <select
      class="select"
      onchange={(e) => {
        timeSpan = e.currentTarget.value as TimeSpan;
        goto(`?span=${timeSpan}`);
      }}
    >
      <!-- On mobile, it gets too big -->
      {#if innerWidth?.current && innerWidth.current < 640}
        {#each ["7d", "30d", "90d"] as span}
          <option value={span} selected={timeSpan === span}>{getMessage(`stats.${span}`)()}</option>
        {/each}
      {:else}
        {#each ["7d", "30d", "90d", "180d", "365d"] as span}
          <option value={span} selected={timeSpan === span}>{getMessage(`stats.${span}`)()}</option>
        {/each}
      {/if}
    </select>
  </fieldset>
</div>

<div class="container-wrapper">
  {#if !timeSpan}
    <div class="loading loading-spinner w-20"></div>
  {:else}
    <div class="chart-container" style={chartContainerStyle}>
      <canvas bind:this={serversCanvas}></canvas>
    </div>

    <div class="chart-container" style={chartContainerStyle}>
      <canvas bind:this={usersCanvas}></canvas>
    </div>

    <div class="chart-container" style={chartContainerStyle}>
      <canvas bind:this={ticketsCanvas}></canvas>
    </div>
  {/if}
</div>

<style>
  .chart-container {
    width: 100%;
    max-width: 1200px;
    margin-inline: auto;
    padding-block: 20px;
    padding-inline: 10px;
    position: relative;
    aspect-ratio: 21 / 9;
  }

  .container-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
