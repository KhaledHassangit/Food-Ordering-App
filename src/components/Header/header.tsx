import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import Link from "../link/link";
import Navbar from "./NavBar";
import LanguageSwitcher from "./Languare-Switcher";
import CartButton from "./CartButton";
import AuthButtons from "./auth-buttons";

async function Header() {
  const locale = await getCurrentLocale();
  const initialSession = await getServerSession(authOptions);
  const translations = await getTrans(locale);

  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between gap-6 lg:gap-10">
        <Link
          href={`/${locale}`}
          className="text-primary font-semibold text-2xl"
        >
          🍕 {translations.logo}
        </Link>
        <Navbar translations={translations} initialSession={initialSession} />
        <div className="flex items-center flex-1 gap-6  justify-end">
          <div className="hidden lg:flex lg:items-center lg:gap-6 ">
            <AuthButtons
              translations={translations}
              initialSession={initialSession}
            />
            <LanguageSwitcher />
          </div>
          <CartButton />
        </div>
      </div>
    </header>
  );
}

export default Header;