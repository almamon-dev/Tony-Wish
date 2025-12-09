  <header class="flex h-16 items-center justify-between border-b bg-white px-4 sm:px-6 md:px-6 shadow-sm">
      <div class="flex items-center gap-3 sm:gap-4 flex-1">
          <button @click="sidebarCollapsed = !sidebarCollapsed"
              class="hidden lg:inline-flex items-center justify-center rounded-md text-sm hover:bg-gray-100 h-10 w-10 transition-colors">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
          </button>

          <div class="relative max-w-md w-full">
              <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
              </svg>
              <input type="search"
                  class="w-full rounded-full bg-gray-100 px-10 py-2 text-sm focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                  placeholder="Search..." />
          </div>
      </div>

      <div class="flex items-center gap-2 sm:gap-4">
          <button
              class="relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <i class="fas fa-bell text-gray-700 text-lg"></i>
              <span
                  class="absolute top-1 right-1 h-4 w-4 bg-blue-600 text-white text-[10px] rounded-full flex items-center justify-center">3</span>
          </button>

          <div class="relative" x-data="{ profileOpen: false }">
              <button @click="profileOpen = !profileOpen"
                  class="flex items-center gap-2 hover:bg-gray-100 rounded-full px-2 py-1 transition-colors">
                  <img src="https://i.pravatar.cc/40" alt="Profile"
                      class="h-8 w-8 rounded-full border border-gray-200" />
                  <span class="text-sm text-gray-800 hidden md:block">Admin User</span>
                  <i class="fas fa-chevron-down text-gray-500 text-xs hidden md:block"></i>
              </button>

              <div x-show="profileOpen" @click.away="profileOpen = false" x-transition
                  class="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <div class="px-4 py-3 border-b border-gray-100">
                      <p class="text-sm font-semibold text-gray-800">Admin User</p>
                      <p class="text-xs text-gray-500">admin@example.com</p>
                  </div>
                  <button
                      class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                      <i class="fas fa-sign-out-alt w-4"></i>
                      Logout
                  </button>
              </div>
          </div>
      </div>
  </header>
