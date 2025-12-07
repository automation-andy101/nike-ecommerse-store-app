import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "Featured",
    links: [
      { label: "Air Force 1", href: "/featured/air-force-1" },
      { label: "Huarache", href: "/featured/huarache" },
      { label: "Air Max 90", href: "/featured/air-max-90" },
      { label: "Air Max 95", href: "/featured/air-max-95" },
    ],
  },
  {
    title: "Shoes",
    links: [
      { label: "All Shoes", href: "/shoes" },
      { label: "Custom Shoes", href: "/shoes/custom" },
      { label: "Jordan Shoes", href: "/shoes/jordan" },
      { label: "Running Shoes", href: "/shoes/running" },
    ],
  },
  {
    title: "Clothing",
    links: [
      { label: "All Clothing", href: "/clothing" },
      { label: "Modest Wear", href: "/clothing/modest-wear" },
      { label: "Hoodies & Pullovers", href: "/clothing/hoodies" },
      { label: "Shirts & Tops", href: "/clothing/shirts" },
    ],
  },
  {
    title: "Kids'",
    links: [
      { label: "Infant & Toddler Shoes", href: "/kids/infant-toddler" },
      { label: "Kids' Shoes", href: "/kids/shoes" },
      { label: "Kids' Jordan Shoes", href: "/kids/jordan" },
      { label: "Kids' Basketball Shoes", href: "/kids/basketball" },
    ],
  },
];

interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

const socialLinks: SocialLink[] = [
  { name: "X (Twitter)", href: "https://twitter.com/nike", icon: "/x.svg" },
  {
    name: "Facebook",
    href: "https://facebook.com/nike",
    icon: "/facebook.svg",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/nike",
    icon: "/instagram.svg",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-light-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Nike Home">
              <Image
                src="/logo.svg"
                alt="Nike Logo"
                width={80}
                height={29}
                className="w-16 md:w-20"
              />
            </Link>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-caption font-medium text-light-100 mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-caption text-dark-500 hover:text-light-100 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1 flex lg:justify-end">
            <div className="flex items-start gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-dark-700 hover:border-light-100 transition-colors"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={18}
                    height={18}
                    className="invert"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-footnote text-dark-500">
              &copy; {currentYear} Nike, Inc. All Rights Reserved
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link
                href="/guides"
                className="text-footnote text-dark-500 hover:text-light-100 transition-colors"
              >
                Guides
              </Link>
              <Link
                href="/terms-of-sale"
                className="text-footnote text-dark-500 hover:text-light-100 transition-colors"
              >
                Terms of Sale
              </Link>
              <Link
                href="/terms-of-use"
                className="text-footnote text-dark-500 hover:text-light-100 transition-colors"
              >
                Terms of Use
              </Link>
              <Link
                href="/privacy-policy"
                className="text-footnote text-dark-500 hover:text-light-100 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
