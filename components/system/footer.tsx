export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <i className="fas fa-film text-xl text-red-600"></i>
              <h2 className="text-xl font-bold text-white">CineStream</h2>
            </div>
            <p className="text-sm mb-4">
              The ultimate destination for movie lovers. Stream thousands of
              movies and TV shows anytime, anywhere.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition cursor-pointer"
                >
                  Movies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition cursor-pointer"
                >
                  TV Shows
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition cursor-pointer"
                >
                  New & Popular
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition cursor-pointer"
                >
                  My List
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition cursor-pointer"
                >
                  Account
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition cursor-pointer"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition cursor-pointer"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition cursor-pointer"
                >
                  Devices
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition cursor-pointer"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition cursor-pointer"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition cursor-pointer"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition cursor-pointer"
                >
                  Cookie Preferences
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition cursor-pointer"
                >
                  Corporate Information
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h3 className="text-white font-medium mb-2">We Accept</h3>
              <div className="flex space-x-3">
                <i className="fab fa-cc-visa text-2xl"></i>
                <i className="fab fa-cc-mastercard text-2xl"></i>
                <i className="fab fa-cc-paypal text-2xl"></i>
                <i className="fab fa-cc-apple-pay text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-center">
          <p>&copy; 2025 CineStream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
