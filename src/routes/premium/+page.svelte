<script>
  // Function to handle the redirect to dashboard
  function redirectToDashboard() {
    window.location.href = "https://dashboard.supportmail.dev/?redirect=premium";
  }
</script>

<div class="bg-base-300 min-h-screen px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
    <div class="mb-12 text-center">
      <h1 class="text-primary-content mb-4 text-4xl font-bold">Choose Your Plan</h1>
      <p class="text-base-content mx-auto max-w-2xl text-xl opacity-80">
        Select the perfect plan for your Discord server. All plans are billed per server, not per user.
      </p>
    </div>

    <div class="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
      <!-- Basic Plan -->
      <div class="card bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div class="card-body">
          <h2 class="card-title w-full text-center text-2xl font-bold">Basic Plan</h2>
          <div class="my-4 flex justify-center">
            <span class="text-4xl font-bold">4€</span>
            <span class="mb-1 ml-1 self-end text-xl opacity-70">/month</span>
          </div>

          <div class="divider"></div>

          <ul class="mb-6 space-y-3">
            <li class="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-success mr-2 h-6 w-6 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Full access to all basic bot features</span>
            </li>
            <li class="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-success mr-2 h-6 w-6 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Priority support via email</span>
            </li>
            <li class="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-success mr-2 h-6 w-6 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Up to 5 custom commands</span>
            </li>
            <li class="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-success mr-2 h-6 w-6 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Basic analytics dashboard</span>
            </li>
          </ul>

          <div class="card-actions mt-auto justify-center">
            <button class="btn btn-primary btn-lg w-full" on:click={redirectToDashboard}> Choose Server </button>
          </div>
        </div>
      </div>

      <!-- WhiteLabel Plan -->
      <div class="card bg-primary text-primary-content shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div class="absolute -top-4 right-4">
          <div class="badge badge-secondary px-4 py-3 text-sm font-bold">POPULAR</div>
        </div>
        <div class="card-body">
          <h2 class="card-title w-full text-center text-2xl font-bold">WhiteLabel Plan</h2>
          <div class="my-4 flex justify-center">
            <span class="text-4xl font-bold">10€</span>
            <span class="mb-1 ml-1 self-end text-xl opacity-70">/month</span>
          </div>

          <div class="divider"></div>

          <ul class="mb-6 space-y-3">
            <li class="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-success mr-2 h-6 w-6 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Everything in Basic plan</span>
            </li>
            <li class="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-success mr-2 h-6 w-6 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Custom bot name and avatar</span>
            </li>
            <li class="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-success mr-2 h-6 w-6 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Unlimited custom commands</span>
            </li>
            <li class="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-success mr-2 h-6 w-6 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Advanced analytics and reporting</span>
            </li>
            <li class="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-success mr-2 h-6 w-6 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Dedicated support channel</span>
            </li>
            <li class="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-success mr-2 h-6 w-6 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>No branding - fully white labeled</span>
            </li>
          </ul>

          <div class="card-actions mt-auto justify-center">
            <button class="btn btn-secondary btn-lg w-full" on:click={redirectToDashboard}> Choose Server </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-16 text-center">
      <h3 class="mb-4 text-2xl font-semibold">Frequently Asked Questions</h3>
      <div class="mx-auto max-w-3xl">
        <div class="collapse-plus bg-base-100 collapse mb-4">
          <input type="radio" name="faq-accordion" checked />
          <div class="collapse-title text-xl font-medium">How is billing handled?</div>
          <div class="collapse-content">
            <p>Plans are billed monthly per server. You can cancel your subscription at any time from your dashboard.</p>
          </div>
        </div>
        <div class="collapse-plus bg-base-100 collapse mb-4">
          <input type="radio" name="faq-accordion" />
          <div class="collapse-title text-xl font-medium">Can I switch between plans?</div>
          <div class="collapse-content">
            <p>
              Yes, you can upgrade or downgrade your plan at any time. Changes will be applied immediately and billing will be
              adjusted accordingly.
            </p>
          </div>
        </div>
        <div class="collapse-plus bg-base-100 collapse mb-4">
          <input type="radio" name="faq-accordion" />
          <div class="collapse-title text-xl font-medium">What payment methods do you accept?</div>
          <div class="collapse-content">
            <p>
              We accept all major credit cards, PayPal, and some cryptocurrency options. All payments are processed securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
