import { Company, ContentPage, Client } from '../types/models';

export const mockCompany: Company = {
  id: "cyberallstars",
  name: "CyberAllStars",
  industry: "Adult Entertainment",
  size: "50-200",
  revenue: "$1M-$5M",
  status: "customer",
  website: "https://cyberallstars.com",
  logo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&h=200&fit=crop"
};

export const mockClient: Client = {
  id: "cas-admin",
  name: "CyberAllStars Admin",
  email: "admin@cyberallstars.com",
  role: "admin",
  permissions: ["all"],
  lastLogin: new Date().toISOString(),
  status: "active"
};

export const mockPages: ContentPage[] = [
  {
    id: "landing",
    title: "CyberAllStars - Premium Adult Entertainment Platform",
    slug: "home",
    type: "profile",
    layout: "custom",
    visibility: "public",
    components: [
      {
        id: "hero",
        type: "hero",
        data: {
          title: "Join the Future of Adult Entertainment",
          subtitle: "Premium Platform for Models and Content Creators",
          cta: "Start Earning Today",
          backgroundImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&h=800&fit=crop"
        },
        settings: {
          position: { x: 0, y: 0 },
          size: { width: 100, height: 600 },
          style: {}
        }
      },
      {
        id: "features",
        type: "grid",
        data: {
          items: [
            {
              icon: "dollar",
              title: "High Earnings",
              description: "Industry-leading commission rates and weekly payouts"
            },
            {
              icon: "shield",
              title: "Secure Platform",
              description: "Advanced security measures to protect your content and earnings"
            },
            {
              icon: "users",
              title: "Growing Community",
              description: "Access to millions of engaged users worldwide"
            },
            {
              icon: "tools",
              title: "Professional Tools",
              description: "Streaming, content management, and analytics tools"
            }
          ]
        },
        settings: {
          position: { x: 0, y: 600 },
          size: { width: 100, height: 400 },
          style: {}
        }
      },
      {
        id: "application-form",
        type: "form",
        data: {
          title: "Become a CyberAllStars Model",
          fields: [
            {
              type: "text",
              label: "Full Name",
              required: true
            },
            {
              type: "email",
              label: "Email Address",
              required: true
            },
            {
              type: "tel",
              label: "Phone Number",
              required: true
            },
            {
              type: "select",
              label: "Experience Level",
              options: ["Beginner", "Intermediate", "Professional"],
              required: true
            },
            {
              type: "textarea",
              label: "Tell us about yourself",
              required: true
            }
          ],
          submitButton: "Submit Application"
        },
        settings: {
          position: { x: 0, y: 1000 },
          size: { width: 100, height: 600 },
          style: {}
        }
      },
      {
        id: "testimonials",
        type: "testimonials",
        data: {
          title: "Success Stories",
          items: [
            {
              name: "Sarah K.",
              avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
              quote: "CyberAllStars changed my life. I'm now earning more than ever while maintaining full control of my content.",
              rating: 5
            },
            {
              name: "Jessica M.",
              avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
              quote: "The platform's professional tools and support team make it easy to focus on creating content.",
              rating: 5
            }
          ]
        },
        settings: {
          position: { x: 0, y: 1600 },
          size: { width: 100, height: 400 },
          style: {}
        }
      },
      {
        id: "services",
        type: "services",
        data: {
          title: "Our Services",
          services: [
            {
              title: "Live Streaming",
              description: "High-quality, low-latency streaming platform with interactive features",
              icon: "video"
            },
            {
              title: "Content Management",
              description: "Easy-to-use tools for managing and monetizing your content",
              icon: "folder"
            },
            {
              title: "Marketing Support",
              description: "Built-in promotion tools and marketing assistance",
              icon: "trending-up"
            },
            {
              title: "Analytics & Insights",
              description: "Detailed performance metrics and audience insights",
              icon: "bar-chart"
            }
          ]
        },
        settings: {
          position: { x: 0, y: 2000 },
          size: { width: 100, height: 500 },
          style: {}
        }
      }
    ],
    settings: {
      theme: "dark",
      customCss: `
        .hero-section {
          background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5));
        }
        .cta-button {
          background: linear-gradient(45deg, #ff4b81, #ff6b6b);
        }
      `
    }
  },
  {
    id: "dashboard",
    title: "Model Dashboard",
    slug: "dashboard",
    type: "dashboard",
    layout: "grid",
    visibility: "private",
    components: [
      {
        id: "stats",
        type: "stats",
        data: {
          metrics: [
            { label: "Total Earnings", value: "$12,345" },
            { label: "Active Subscribers", value: "234" },
            { label: "Content Views", value: "12.3K" },
            { label: "Stream Hours", value: "45" }
          ]
        },
        settings: {
          position: { x: 0, y: 0 },
          size: { width: 100, height: 200 },
          style: {}
        }
      }
    ],
    settings: {
      theme: "light"
    }
  }
];