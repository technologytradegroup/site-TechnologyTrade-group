type Table<Row extends object> = {
  Row: Row;
  Insert: Partial<Row>;
  Update: Partial<Row>;
  Relationships: [];
};

type Timestamped = {
  created_at: string;
  updated_at?: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: Table<
        Timestamped & {
          id: string;
          email: string | null;
          first_name: string;
          last_name: string;
          phone: string | null;
          account_type: "buyer" | "supplier";
        }
      >;
      organizations: Table<
        Timestamped & {
          id: string;
          name: string;
          organization_type:
            | "company"
            | "public_institution"
            | "nonprofit"
            | "independent";
          country: string | null;
          city: string | null;
          website: string | null;
          description: string;
          is_public: boolean;
        }
      >;
      organization_members: Table<{
        organization_id: string;
        user_id: string;
        role: "owner" | "admin" | "member";
        created_at: string;
      }>;
      supplier_profiles: Table<
        Timestamped & {
          organization_id: string;
          verification_status:
            | "pending"
            | "under_review"
            | "verified"
            | "rejected";
          verification_notes: string | null;
          verified_at: string | null;
        }
      >;
      platform_admins: Table<{
        user_id: string;
        role: "super_admin" | "moderator" | "editor" | "support" | "analyst";
        created_at: string;
      }>;
      categories: Table<{
        id: string;
        name: string;
        slug: string;
        description: string;
        is_active: boolean;
        created_at: string;
      }>;
      offers: Table<
        Timestamped & {
          id: string;
          organization_id: string;
          category_id: string;
          created_by: string;
          title: string;
          slug: string;
          offer_type:
            | "product"
            | "service"
            | "software"
            | "solution"
            | "training";
          summary: string;
          description: string;
          currency: string | null;
          price_min: number | null;
          price_max: number | null;
          price_unit: string | null;
          status:
            | "draft"
            | "pending_review"
            | "published"
            | "rejected"
            | "archived";
          published_at: string | null;
        }
      >;
      service_requests: Table<
        Timestamped & {
          id: string;
          organization_id: string;
          created_by: string;
          category_id: string | null;
          title: string;
          description: string;
          budget_min: number | null;
          budget_max: number | null;
          currency: string | null;
          desired_start_date: string | null;
          desired_end_date: string | null;
          response_deadline: string | null;
          status:
            | "draft"
            | "submitted"
            | "published"
            | "closed"
            | "cancelled";
        }
      >;
      request_supplier_matches: Table<{
        request_id: string;
        organization_id: string;
        status: "invited" | "accepted" | "declined" | "withdrawn";
        created_at: string;
      }>;
      quotes: Table<
        Timestamped & {
          id: string;
          request_id: string;
          supplier_organization_id: string;
          created_by: string;
          amount: number;
          currency: string;
          delivery_days: number | null;
          message: string;
          status:
            | "draft"
            | "submitted"
            | "accepted"
            | "rejected"
            | "withdrawn";
          valid_until: string | null;
        }
      >;
      opportunities: Table<
        Timestamped & {
          id: string;
          organization_id: string;
          created_by: string;
          category_id: string | null;
          title: string;
          slug: string;
          opportunity_type:
            | "tender"
            | "call_for_projects"
            | "startup_program"
            | "collaboration";
          description: string;
          country: string | null;
          budget_min: number | null;
          budget_max: number | null;
          currency: string | null;
          application_deadline: string | null;
          status:
            | "draft"
            | "pending_review"
            | "published"
            | "closed"
            | "rejected";
          published_at: string | null;
        }
      >;
      opportunity_applications: Table<
        Timestamped & {
          id: string;
          opportunity_id: string;
          organization_id: string;
          created_by: string;
          message: string;
          status:
            | "submitted"
            | "under_review"
            | "shortlisted"
            | "rejected"
            | "accepted"
            | "withdrawn";
        }
      >;
      content_items: Table<
        Timestamped & {
          id: string;
          created_by: string;
          title: string;
          slug: string;
          content_type:
            | "news"
            | "guide"
            | "study"
            | "case_study"
            | "event"
            | "publication";
          summary: string;
          body: string;
          status: "draft" | "in_review" | "published" | "archived";
          published_at: string | null;
        }
      >;
      notifications: Table<{
        id: string;
        user_id: string;
        title: string;
        body: string;
        href: string | null;
        read_at: string | null;
        created_at: string;
      }>;
      audit_logs: Table<{
        id: number;
        actor_id: string | null;
        action: string;
        target_type: string;
        target_id: string | null;
        details: Json;
        created_at: string;
      }>;
      administration_roles: Table<{
        role_key: string;
        name: string;
        description: string;
        created_at: string;
      }>;
      administration_permissions: Table<{
        permission_key: string;
        description: string;
        created_at: string;
      }>;
      administration_role_permissions: Table<{
        role_key: string;
        permission_key: string;
      }>;
      administration_user_roles: Table<{
        user_id: string;
        role_key: string;
        granted_by: string | null;
        granted_at: string;
        revoked_at: string | null;
      }>;
      company_profile: Table<
        Timestamped & {
          id: number;
          legal_name: string | null;
          display_name: string;
          registration_country: string | null;
          public_address: string | null;
          public_email: string | null;
          public_phone: string | null;
          website: string | null;
          overview: string;
          mission: string;
          vision: string;
          publication_status: PublicationStatus;
          published_at: string | null;
          created_by: string | null;
          updated_by: string | null;
          reviewed_by: string | null;
        }
      >;
      company_history: Table<
        Published & {
          id: string;
          title: string;
          body: string;
          event_date: string | null;
          sort_order: number;
          created_by: string | null;
          updated_by: string | null;
        }
      >;
      company_values: Table<
        Published & {
          id: string;
          name: string;
          description: string;
          sort_order: number;
          created_by: string | null;
          updated_by: string | null;
        }
      >;
      company_objectives: Table<
        Published & {
          id: string;
          title: string;
          description: string;
          target_date: string | null;
          sort_order: number;
          created_by: string | null;
          updated_by: string | null;
        }
      >;
      company_pillars: Table<
        Published & {
          id: string;
          slug: string;
          brand_name: string;
          label_fr: string;
          short_description: string;
          description: string;
          objectives: string;
          sort_order: number;
          created_by: string | null;
          updated_by: string | null;
        }
      >;
      pillar_projects: Table<
        Published & {
          id: string;
          pillar_id: string;
          title: string;
          description: string;
          href: string | null;
          sort_order: number;
          created_by: string | null;
          updated_by: string | null;
        }
      >;
      media_assets: Table<
        Timestamped & {
          id: string;
          bucket_id: string;
          object_path: string;
          original_filename: string;
          media_category:
            | "brand"
            | "executive"
            | "governance"
            | "pillar"
            | "partner"
            | "service"
            | "publication"
            | "document"
            | "other";
          mime_type: string;
          file_size_bytes: number;
          visibility: "private" | "public";
          alt_text: string;
          caption: string;
          captured_at: string | null;
          publication_status: PublicationStatus;
          uploaded_by: string;
          reviewed_by: string | null;
          published_at: string | null;
        }
      >;
      pillar_media: Table<{
        pillar_id: string;
        media_asset_id: string;
        usage: "cover" | "gallery";
        sort_order: number;
      }>;
      partner_categories: Table<{
        category_key: string;
        name: string;
        created_at: string;
      }>;
      partners: Table<
        Omit<Published, "publication_status"> & {
          id: string;
          publication_status: PublicationStatus | "rejected";
          name: string;
          category_key: string;
          country: string | null;
          website: string | null;
          description: string;
          logo_asset_id: string | null;
          relationship_confirmed: boolean;
          brand_use_authorized: boolean;
          created_by: string | null;
          updated_by: string | null;
        }
      >;
      partnerships: Table<
        Published & {
          id: string;
          partner_id: string;
          partnership_type: string;
          description: string;
          start_date: string | null;
          end_date: string | null;
          created_by: string | null;
          updated_by: string | null;
        }
      >;
      company_service_categories: Table<
        Timestamped & {
          id: string;
          name: string;
          slug: string;
          description: string;
          sort_order: number;
          publication_status: "draft" | "pending_review" | "published" | "archived";
          published_at: string | null;
          created_by: string | null;
          reviewed_by: string | null;
        }
      >;
      company_services: Table<
        Published & {
          id: string;
          category_id: string;
          slug: string;
          name: string;
          summary: string;
          problem_solved: string;
          description: string;
          benefits: string;
          deliverables: string;
          target_audience: string;
          indicative_delivery_time: string | null;
          faq: Json;
          created_by: string | null;
          updated_by: string | null;
        }
      >;
      service_packages: Table<
        Published & {
          id: string;
          service_id: string;
          name: string;
          description: string;
          deliverables: string;
          sort_order: number;
          created_by: string | null;
          updated_by: string | null;
        }
      >;
      service_prices: Table<
        Timestamped & {
          id: string;
          service_id: string;
          package_id: string | null;
          pricing_model: "fixed" | "from" | "range" | "quote" | "recurring";
          currency: string | null;
          amount_min: number | null;
          amount_max: number | null;
          billing_period: string | null;
          terms: string;
          effective_from: string | null;
          effective_until: string | null;
          publication_status: PublicationStatus;
          approved_by: string | null;
          published_at: string | null;
          created_by: string | null;
          reviewed_by: string | null;
        }
      >;
      service_options: Table<
        Timestamped & {
          id: string;
          service_id: string;
          name: string;
          description: string;
          price_id: string | null;
          sort_order: number;
          publication_status: PublicationStatus;
          published_at: string | null;
          created_by: string | null;
          reviewed_by: string | null;
        }
      >;
      company_quote_requests: Table<Timestamped & {
        id: string;
        reference: string;
        service_id: string;
        package_id: string | null;
        requester_id: string | null;
        requester_name: string;
        requester_email: string;
        organization_name: string | null;
        description: string;
        budget_min: number | null;
        budget_max: number | null;
        currency: string | null;
        desired_deadline: string | null;
        status:
          | "submitted"
          | "received"
          | "in_review"
          | "needs_information"
          | "quoted"
          | "accepted"
          | "rejected"
          | "closed";
      }>;
      company_quotes: Table<
        Timestamped & {
          id: string;
          request_id: string;
          amount: number;
          currency: string;
          message: string;
          valid_until: string | null;
          status: "draft" | "submitted" | "accepted" | "rejected" | "withdrawn";
          created_by: string;
        }
      >;
    };
    Views: Record<string, never>;
    Functions: {
      has_admin_permission: {
        Args: { required_permission: string };
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type PublicationStatus =
  | "draft"
  | "pending_review"
  | "published"
  | "archived";

type Published = Timestamped & {
  publication_status: PublicationStatus;
  published_at: string | null;
  reviewed_by: string | null;
};
