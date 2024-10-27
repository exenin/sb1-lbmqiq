// Adding to existing types
export interface Persona {
  id: string;
  name: string;
  type: 'public' | 'private' | 'exclusive';
  avatar: string;
  bio: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
  contentCategories: string[];
  customFields: {
    key: string;
    value: string;
    type: 'text' | 'number' | 'link' | 'image';
  }[];
}

export interface Talent {
  id: string;
  userId: string;
  personas: Persona[];
  defaultPersonaId: string;
  status: 'active' | 'inactive' | 'pending';
  verificationStatus: 'verified' | 'pending' | 'rejected';
  earnings: {
    total: number;
    pending: number;
    lastPayout: number;
  };
  metrics: {
    followers: number;
    totalStreams: number;
    averageViewers: number;
    totalHours: number;
  };
}

export interface ContentPage {
  id: string;
  title: string;
  slug: string;
  type: 'profile' | 'shop' | 'gallery' | 'dashboard' | 'custom';
  layout: 'grid' | 'list' | 'masonry' | 'custom';
  components: PageComponent[];
  visibility: 'public' | 'private' | 'members';
  settings: {
    theme: string;
    customCss?: string;
    customJs?: string;
  };
}

export interface PageComponent {
  id: string;
  type: string;
  data: any;
  settings: {
    position: { x: number; y: number };
    size: { width: number; height: number };
    style: any;
  };
}

export interface Client {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
  permissions: string[];
  lastLogin: string;
  status: 'active' | 'inactive';
}