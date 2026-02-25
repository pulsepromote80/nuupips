import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const educationLinks = [
    { name: "Forex Education", href: "/pages/education" },
    { name: "Stock Market", href: "/pages/education" },
    { name: "Trading Psychology", href: "/pages/education" },
    { name: "Risk Management", href: "/pages/education" },
    { name: "Video Library", href: "/pages/videos" },
  ];

  const communityLinks = [
    { name: "Discussion Groups", href: "/pages/community" },
    { name: "Live Sessions", href: "/pages/community" },
    { name: "Expert Faculty", href: "/pages/experts" },
    { name: "Academy Partnership", href: "/pages/partnership" },
    { name: "Partners", href: "/pages/contact" },
  ];

  const supportLinks = [
    { name: "Contact Us", href: "/pages/contact" },
    { name: "Disclaimer", href: "/pages/disclaimer" },
    { name: "Email", href: "mailto:education@nupips.com" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <Image src="/assets/img/logo.png" alt="Logo" width={120} height={120} />
            <p className="text-gray-400 mt-4">
              Professional financial markets education platform focused on Forex,
              Stock market, and risk management learning.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Education</h3>
            <ul className="space-y-2">
              {educationLinks.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-gray-400 hover:text-white">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Community</h3>
            <ul className="space-y-2">
              {communityLinks.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-gray-400 hover:text-white">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="text-gray-400 hover:text-white">
                    {l.name === "Email" ? "education@nupips.com" : l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between pt-5">
          <p className="text-gray-400">
            © 2026 NUPIPS. All rights reserved.
          </p>
          <Link href="/pages/disclaimer " className="text-gray-400 hover:text-white">
            Important Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}
