// app/(site)/layout.tsx
import { Header } from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import ChatbotBubble from '@/components/chatbot/ChatbotBubble';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Header />
      </header>

      <main>{children}</main>
      <ChatbotBubble />
      <footer>
        <Footer />
      </footer>
    </>
  );
}
