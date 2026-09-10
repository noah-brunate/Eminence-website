import { useSiteCopy } from "@/lib/site-content";
import React from "react";

export default function Terms() {
  const copy = useSiteCopy("terms");

  return (
    <div className="w-full bg-white dark:bg-slate-950 min-h-screen py-32">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
          {copy("001", "Terms of Service")}
        </h1>
        <div className="text-slate-500 mb-10">
          {copy("002", "Last updated: ")}
          {copy("effective-date", "September 8, 2026")}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>
            {copy(
              "003",
              'These Terms of Service ("Terms") govern your access to and use of the services, websites, and applications offered by EMINENCE (the "Service"). Please read these Terms carefully before using the Service.',
            )}
          </p>

          <h2>{copy("004", "1. Acceptance of Terms")}</h2>
          <p>
            {copy(
              "005",
              "By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Service.",
            )}
          </p>

          <h2>{copy("006", "2. Use of Service")}</h2>
          <p>
            {copy(
              "007",
              "You agree to use the Service only for lawful purposes and in accordance with these Terms. You are responsible for all of your activity in connection with the Service.",
            )}
          </p>
          <p>{copy("008", "You must not:")}</p>
          <ul>
            <li>
              {copy(
                "009",
                "Use the Service in any way that violates any applicable local, national, or international law or regulation.",
              )}
            </li>
            <li>
              {copy(
                "010",
                "Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service.",
              )}
            </li>
            <li>
              {copy(
                "011",
                "Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service, the server on which the Service is stored, or any server, computer, or database connected to the Service.",
              )}
            </li>
          </ul>

          <h2>{copy("012", "3. Intellectual Property")}</h2>
          <p>
            {copy(
              "013",
              "The Service and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by EMINENCE, its licensors, or other providers of such material and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.",
            )}
          </p>

          <h2>{copy("014", "4. Disclaimer of Warranties")}</h2>
          <p>
            {copy(
              "015",
              'The Service is provided on an "AS IS" and "AS AVAILABLE" basis, without any warranties of any kind, either express or implied. EMINENCE disclaims all warranties, express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
            )}
          </p>

          <h2>{copy("016", "5. Limitation of Liability")}</h2>
          <p>
            {copy(
              "017",
              "In no event shall EMINENCE, its affiliates, or their respective officers, directors, employees, or agents be liable for any indirect, consequential, special, incidental, or punitive damages arising out of or related to your use of the Service.",
            )}
          </p>

          <h2>{copy("018", "6. Changes to Terms")}</h2>
          <p>
            {copy(
              "019",
              "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
            )}
          </p>

          <h2>{copy("020", "7. Contact Information")}</h2>
          <p>
            {copy(
              "021",
              "Questions about the Terms of Service should be sent to us at ",
            )}
            <a href={copy("022", "mailto:legal@eminence.dev")}>
              {copy("023", "legal@eminence.dev")}
            </a>
            {copy("024", ".")}
          </p>
        </div>
      </div>
    </div>
  );
}
