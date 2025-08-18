<script lang="ts">
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";

  let loading = $state(false);
  let success = $state(false);
  let error = $state("");

  const handleSubmit: SubmitFunction<any, any> = () => {
    loading = true;
    success = false;
    error = "";

    return async ({ result, update, formElement }) => {
      loading = false;

      if (result.type === "success") {
        success = true;
        // Reset form
        formElement.reset();
      } else if (result.type === "failure") {
        error = result.data?.message || "Something went wrong";
      }

      await update();
    };
  };
</script>

<div class="mx-auto w-full max-w-2xl flex-col items-center justify-center gap-2 space-y-4 p-4 select-none">
  <div class="text-center">
    <h3 class="font-bold">Use this contact form for important requests.</h3>
    <p class="text-xs">I usually respond within 24 hours.</p>
  </div>
  <div class="grid w-full place-items-center">
    <div class="alert alert-soft shadow-warning alert-warning alert-vertical md:alert-horizontal justify-between shadow-lg">
      <div class="flex animate-pulse flex-col">
        <h3 class="font-bold">Please do not use this form for support requests.</h3>
        <p class="text-xs">
          This contact form is not intended for support requests.<br />
          For support, please use the support forum in the Discord server!<br />
          I won't respond to support requests sent via this contact form.
        </p>
      </div>
      <a class="btn btn-sm btn-warning" href="https://server.supportmail.dev" target="_blank">Go to Support Forum</a>
    </div>
  </div>
</div>

<form
  id="contact-form"
  method="POST"
  action="?/sendEmail"
  class="mx-auto mt-10 mb-20 max-w-md space-y-4"
  use:enhance={handleSubmit}
>
  <label class="floating-label">
    <span>Your Name</span>
    <input type="text" id="name" name="name" placeholder="John Doe" minlength="2" class="input input-md w-full rounded-md" />
  </label>

  <label class="floating-label">
    <span>Your Email</span>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="mail@gmail.com"
      minlength="5"
      class="input input-md w-full rounded-md"
    />
  </label>

  <textarea
    class="textarea max-h-60 w-full rounded-md"
    id="message"
    name="message"
    placeholder="Message (English / German)"
    maxlength="2000"
  ></textarea>

  <button type="submit" disabled={loading} class="btn btn-primary w-full">
    {loading ? "Sending..." : "Send Message"}
  </button>

  {#if success}
    <div class="alert alert-success">Message sent successfully!</div>
  {/if}

  {#if error}
    <div class="alert alert-error">
      {error}
    </div>
  {/if}
</form>
