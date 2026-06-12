"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ALL_SETTING_KEYS } from "@/lib/site-settings-keys";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation" ;

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", { email, password, redirect: false });
    redirect("/admin");
  } catch {
    return { error: "Invalid email or password" };
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/admin/login" });
}

// Products
export async function createProduct(formData: FormData) {
  await requireAuth();
  const name = formData.get("name") as string;
  const categoryId = formData.get("categoryId") as string;
  const type = formData.get("type") as "machinery" | "spare_part" | "service";
  const description = formData.get("description") as string;
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") !== "off";
  const specsRaw = formData.get("specs") as string;

  let specs = {};
  if (specsRaw) {
    try {
      specs = JSON.parse(specsRaw);
    } catch {
      throw new Error("Invalid specs JSON");
    }
  }

  const slug = slugify(name);
  await prisma.product.create({
    data: { name, slug, categoryId, type, description, specs, featured, published },
  });

  revalidatePath("/products");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAuth();
  const name = formData.get("name") as string;
  const categoryId = formData.get("categoryId") as string;
  const type = formData.get("type") as "machinery" | "spare_part" | "service";
  const description = formData.get("description") as string;
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";
  const specsRaw = formData.get("specs") as string;

  let specs = {};
  if (specsRaw) {
    try {
      specs = JSON.parse(specsRaw);
    } catch {
      throw new Error("Invalid specs JSON");
    }
  }

  await prisma.product.update({
    where: { id },
    data: { name, categoryId, type, description, specs, featured, published },
  });

  revalidatePath("/products");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await requireAuth();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/products");
  revalidatePath("/admin/products");
}

// Projects
export async function createProject(formData: FormData) {
  await requireAuth();
  const title = formData.get("title") as string;
  const clientType = formData.get("clientType") as string;
  const projectType = formData.get("projectType") as "installation" | "repair" | "upgrade";
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";

  await prisma.project.create({
    data: {
      title,
      slug: slugify(title),
      clientType,
      projectType,
      summary,
      content: content || null,
      published,
    },
  });

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth();
  const title = formData.get("title") as string;
  const clientType = formData.get("clientType") as string;
  const projectType = formData.get("projectType") as "installation" | "repair" | "upgrade";
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";

  await prisma.project.update({
    where: { id },
    data: { title, clientType, projectType, summary, content: content || null, published },
  });

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAuth();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

// Blog
export async function createBlogPost(formData: FormData) {
  await requireAuth();
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";

  await prisma.blogPost.create({
    data: {
      title,
      slug: slugify(title),
      excerpt,
      content,
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  await requireAuth();
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";

  await prisma.blogPost.update({
    where: { id },
    data: { title, excerpt, content, published, publishedAt: published ? new Date() : null },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await requireAuth();
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}

// Certifications
export async function createCertification(formData: FormData) {
  await requireAuth();
  await prisma.certification.create({
    data: {
      name: formData.get("name") as string,
      issuer: formData.get("issuer") as string,
      description: (formData.get("description") as string) || null,
      published: formData.get("published") === "on",
    },
  });
  revalidatePath("/quality");
  revalidatePath("/admin/certifications");
  redirect("/admin/certifications");
}

export async function deleteCertification(id: string) {
  await requireAuth();
  await prisma.certification.delete({ where: { id } });
  revalidatePath("/quality");
  revalidatePath("/admin/certifications");
}

// Industries
export async function createIndustry(formData: FormData) {
  await requireAuth();
  const name = formData.get("name") as string;
  await prisma.industry.create({
    data: {
      name,
      slug: slugify(name),
      description: formData.get("description") as string,
      published: formData.get("published") === "on",
    },
  });
  revalidatePath("/industries");
  revalidatePath("/admin/industries");
  redirect("/admin/industries");
}

export async function deleteIndustry(id: string) {
  await requireAuth();
  await prisma.industry.delete({ where: { id } });
  revalidatePath("/industries");
  revalidatePath("/admin/industries");
}

// Inquiries
export async function updateInquiryStatus(id: string, status: "new" | "contacted" | "closed") {
  await requireAuth();
  await prisma.inquiry.update({ where: { id }, data: { status } });
  revalidatePath("/admin/inquiries");
}

// Settings
export async function updateSettings(formData: FormData) {
  await requireAuth();

  const lat = (formData.get("map_latitude") as string)?.trim();
  const lng = (formData.get("map_longitude") as string)?.trim();

  if (lat && Number.isNaN(parseFloat(lat))) {
    throw new Error("Latitude must be a valid number");
  }
  if (lng && Number.isNaN(parseFloat(lng))) {
    throw new Error("Longitude must be a valid number");
  }

  for (const key of ALL_SETTING_KEYS) {
    const value = formData.get(key);
    if (value !== null && typeof value === "string") {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
  }

  revalidatePath("/", "layout");
  revalidatePath("/contact");
  revalidatePath("/about");
  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=1");
}

// Categories
export async function createCategory(formData: FormData) {
  await requireAuth();
  const name = formData.get("name") as string;
  await prisma.category.create({
    data: {
      name,
      slug: slugify(name),
      description: (formData.get("description") as string) || null,
    },
  });
  revalidatePath("/products");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}
