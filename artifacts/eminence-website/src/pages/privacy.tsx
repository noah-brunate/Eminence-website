import { useSiteCopy } from "@/lib/site-content";
import React from "react";

export default function Privacy() {
  const copy = useSiteCopy("privacy");

  return (
    <div className="w-full bg-white dark:bg-slate-950 min-h-screen py-32">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
          {copy("001", "Privacy Policy")}
        </h1>
        <div className="text-slate-500 mb-10">
          {copy("002", "Last updated: ")}
          {copy("effective-date", "September 8, 2026")}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>
            {copy(
              "003",
              "At EMINENCE, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.",
            )}
          </p>

          <h2>{copy("004", "1. Information We Collect")}</h2>
          <p>
            {copy(
              "005",
              "We may collect information about you in a variety of ways. The information we may collect on the Site includes:",
            )}
          </p>
          <ul>
            <li>
              <strong>{copy("006", "Personal Data:")}</strong>
              {copy(
                "007",
                " Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information that you voluntarily give to us.",
              )}
            </li>
            <li>
              <strong>{copy("008", "Derivative Data:")}</strong>
              {copy(
                "009",
                " Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.",
              )}
            </li>
          </ul>

          <h2>{copy("010", "2. Use of Your Information")}</h2>
          <p>
            {copy(
              "011",
              "Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:",
            )}
          </p>
          <ul>
            <li>
              {copy(
                "012",
                "Deliver targeted advertising, newsletters, and other information regarding promotions and the Site to you.",
              )}
            </li>
            <li>{copy("013", "Email you regarding your account or order.")}</li>
            <li>
              {copy(
                "014",
                "Fulfill and manage purchases, orders, payments, and other transactions related to the Site.",
              )}
            </li>
            <li>
              {copy(
                "015",
                "Generate a personal profile about you to make future visits to the Site more personalized.",
              )}
            </li>
          </ul>

          <h2>{copy("016", "3. Disclosure of Your Information")}</h2>
          <p>
            {copy(
              "017",
              "We may share information we have collected about you in certain situations. Your information may be disclosed as follows:",
            )}
          </p>
          <p>
            <strong>{copy("018", "By Law or to Protect Rights:")}</strong>
            {copy(
              "019",
              " If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.",
            )}
          </p>

          <h2>{copy("020", "4. Security of Your Information")}</h2>
          <p>
            {copy(
              "021",
              "We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.",
            )}
          </p>

          <h2>{copy("022", "5. Contact Us")}</h2>
          <p>
            {copy(
              "023",
              "If you have questions or comments about this Privacy Policy, please contact us at: ",
            )}
            <a href={copy("024", "mailto:privacy@eminence.dev")}>
              {copy("025", "privacy@eminence.dev")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
