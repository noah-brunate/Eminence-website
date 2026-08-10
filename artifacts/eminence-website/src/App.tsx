import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { ThemeProvider } from '@/components/theme-provider';

// Pages
import Home from '@/pages/home';
import About from '@/pages/about';
import Blog from '@/pages/blog';
import BlogPost from '@/pages/blog-post';
import Careers from '@/pages/careers';
import Contact from '@/pages/contact';
import Products from '@/pages/products';
import ProductDetail from '@/pages/product-detail';
import CloudHosting from '@/pages/services/cloud-hosting';
import Consultancy from '@/pages/services/consultancy';
import SoftwareSolutions from '@/pages/services/software-solutions';
import Testimonials from '@/pages/testimonials';
import Privacy from '@/pages/privacy';
import Terms from '@/pages/terms';

// Components
import Layout from '@/components/layout';
import ChatWidget from '@/components/chat-widget';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/careers" component={Careers} />
      <Route path="/contact" component={Contact} />
      <Route path="/products" component={Products} />
      <Route path="/products/:slug" component={ProductDetail} />
      <Route path="/services/cloud-hosting" component={CloudHosting} />
      <Route path="/services/consultancy" component={Consultancy} />
      <Route path="/services/software-solutions" component={SoftwareSolutions} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="eminence-theme">
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Layout>
              <Router />
            </Layout>
            <ChatWidget />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
