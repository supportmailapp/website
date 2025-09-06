<script lang="ts">
  import { getLocale } from "$lib/paraglide/runtime";

  /**
   * SEO configuration options for a web page.
   * Covers basic SEO, Open Graph, and Twitter Cards requirements.
   * Use this interface to define the SEO configuration for a webpage,
   * including meta tags and social media properties.
   * The properties in this interface can be used to generate the
   * necessary HTML meta tags.
   *
   * Adapted from https://github.com/spences10/svead
   */
  export interface SeoConfig {
    /**
     * The title of the web page.
     * Used in the <title> tag, og:title, and twitter:title properties.
     *
     * @type {string}
     */
    title?: string;

    /**
     * The description of the web page.
     * Used in the description meta tag, og:description, and
     * twitter:description properties.
     *
     * Best practices suggest keeping the description between 50-160 characters.
     * Search engines may truncate descriptions longer than 155-160 characters.
     *
     * Note: The Head component does not enforce these limits,
     * it's up to the developer to ensure appropriate length.
     *
     * @type {string}
     */
    description?: string;

    /**
     * The URL of the web page.
     * Used as the og:url property, twitter:url and canonical.
     *
     * @type {string}
     */
    url?: string;

    /**
     * The language of the web page.
     * Used as the og:locale property.
     * Defaults to 'en'.
     *
     * @type {string}
     * @default 'en'
     */
    language?: string;

    /**
     * The URL of the Open Graph image for the web page.
     * Used as the og:image and twitter:image properties.
     *
     * @type {string}
     */
    open_graph_image?: string;

    /**
     * The payment pointer for Web Monetization.
     * Used in the monetization meta tag.
     *
     * @type {string}
     */
    payment_pointer?: string;

    /**
     * The Twitter handle of the content creator or site.
     * Used as the twitter:creator property.
     * Should include the @ symbol.
     *
     * @type {string}
     */
    twitter_handle?: string;

    /**
     * Alternative text for the Open Graph image.
     * Used as the og:image:alt property.
     *
     * @type {string}
     */
    open_graph_image_alt?: string;
  }

  let { seo_config }: { seo_config: SeoConfig } = $props();
</script>

<svelte:head>
  <!-- Canonical URL -->
  {#if seo_config.url}
    <link rel="canonical" href={seo_config.url} />
  {/if}

  <!-- Basic Meta Tags -->
  {#if seo_config.title}
    <title>{seo_config.title}</title>
    <meta name="title" content={seo_config.title} />
  {/if}
  {#if seo_config.description}
    <meta name="description" content={seo_config.description} />
  {/if}

  <!-- Open Graph / Facebook Meta Tags -->
  <meta property="og:type" content="website" />

  {#if seo_config.url}
    <meta property="og:url" content={seo_config.url} />
  {/if}
  {#if seo_config.title}
    <meta property="og:title" content={seo_config.title} />
  {/if}
  {#if seo_config.description}
    <meta property="og:description" content={seo_config.description} />
  {/if}
  {#if seo_config.open_graph_image}
    <meta property="og:image" content={seo_config.open_graph_image} />
    <meta property="og:image:alt" content={seo_config.open_graph_image_alt || seo_config.title} />
  {/if}

  <!-- Twitter Meta Tags -->
  <meta name="twitter:title" content={seo_config.title} />
  <meta name="twitter:description" content={seo_config.description} />
  {#if seo_config.open_graph_image}
    <meta name="twitter:image" content={seo_config.open_graph_image} />
  {/if}
  {#if seo_config.twitter_handle}
    <meta name="twitter:creator" content={seo_config.twitter_handle} />
  {/if}

  <!-- Additional Structured Data -->
  <meta itemprop="name" content={seo_config.title} />
  <meta itemprop="description" content={seo_config.description} />
  {#if seo_config.open_graph_image}
    <meta itemprop="image" content={seo_config.open_graph_image} />
  {/if}

  <!-- Monetisation -->
  {#if seo_config.payment_pointer}
    <meta name="monetization" content={seo_config.payment_pointer} />
  {/if}

  <!-- Language -->
  <meta property="og:locale" content={seo_config.language ?? getLocale()} />
</svelte:head>
