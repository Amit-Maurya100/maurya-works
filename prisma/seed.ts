import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const categories = [
  {
    name: "Spinning Machinery",
    slug: "spinning-machinery",
    description: "Ring frames, carding machines, draw frames, and spinning line equipment.",
    sortOrder: 1,
  },
  {
    name: "Weaving Machinery",
    slug: "weaving-machinery",
    description: "Power looms, shuttle looms, and weaving preparation machinery.",
    sortOrder: 2,
  },
  {
    name: "Knitting Machinery",
    slug: "knitting-machinery",
    description: "Circular knitting machines, flat knitting systems, and accessories.",
    sortOrder: 3,
  },
  {
    name: "Processing Equipment",
    slug: "processing-equipment",
    description: "Dyeing, finishing, and fabric processing machinery.",
    sortOrder: 4,
  },
  {
    name: "Custom Textile Machinery",
    slug: "custom-textile-machinery",
    description: "Engineered-to-order machinery for specialized textile production.",
    sortOrder: 5,
  },
  {
    name: "Spare Parts",
    slug: "spare-parts",
    description: "Genuine and compatible spare parts for textile machinery.",
    sortOrder: 6,
  },
  {
    name: "Repair & Maintenance Services",
    slug: "repair-maintenance",
    description: "Machine repair, preventive maintenance, and annual contracts.",
    sortOrder: 7,
  },
];

const siteSettings: Record<string, string> = {
  company_name: "Maurya Textile Machinery",
  tagline: "Manufacturing & Repairing Textile Machinery Since 1995",
  phone: "+91 98765 43210",
  email: "info@mauryatextile.com",
  whatsapp: "+919876543210",
  address: "Industrial Area, Phase II, Surat, Gujarat 394210, India",
  map_latitude: "21.1702",
  map_longitude: "72.8311",
  map_zoom: "15",
  map_embed_url: "",
  hero_title: "Precision Textile Machinery Manufacturing & Expert Repair Services",
  hero_subtitle:
    "Trusted partner for textile mills, garment manufacturers, and industrial producers across India.",
  about_history:
    "Founded in 1995, Maurya Textile Machinery has grown from a small repair workshop into a full-scale manufacturing and servicing company. We serve over 500 textile units with precision engineering and rapid turnaround.",
  about_mission:
    "To deliver reliable textile machinery solutions that maximize uptime, efficiency, and production quality for our clients.",
  about_values:
    "Quality craftsmanship, transparent service, on-time delivery, and long-term client partnerships.",
  quality_process:
    "Every machine undergoes multi-stage inspection — material verification, dimensional checks, trial runs, and final QC sign-off before dispatch.",
};

async function main() {
  console.log("Seeding database...");

  const passwordHash = await bcrypt.hash("admin123", 12);
  await prisma.adminUser.upsert({
    where: { email: "admin@mauryatextile.com" },
    update: {},
    create: {
      email: "admin@mauryatextile.com",
      passwordHash,
      name: "Admin",
    },
  });

  for (const setting of Object.entries(siteSettings)) {
    await prisma.siteSetting.upsert({
      where: { key: setting[0] },
      update: { value: setting[1] },
      create: { key: setting[0], value: setting[1] },
    });
  }

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  const spinning = await prisma.category.findUnique({
    where: { slug: "spinning-machinery" },
  });
  const weaving = await prisma.category.findUnique({
    where: { slug: "weaving-machinery" },
  });
  const repair = await prisma.category.findUnique({
    where: { slug: "repair-maintenance" },
  });

  if (spinning) {
    await prisma.product.upsert({
      where: {
        categoryId_slug: { categoryId: spinning.id, slug: "ring-spinning-frame" },
      },
      update: {},
      create: {
        name: "Ring Spinning Frame",
        slug: "ring-spinning-frame",
        categoryId: spinning.id,
        type: "machinery",
        description:
          "High-speed ring spinning frame designed for consistent yarn quality and reduced power consumption. Ideal for cotton and blended fiber processing.",
        specs: {
          Spindles: "96–480",
          "Delivery Speed": "Up to 25 m/min",
          "Power Requirement": "15–45 kW",
        },
        images: [],
        featured: true,
        published: true,
      },
    });
  }

  if (weaving) {
    await prisma.product.upsert({
      where: {
        categoryId_slug: { categoryId: weaving.id, slug: "rapier-loom" },
      },
      update: {},
      create: {
        name: "Rapier Loom",
        slug: "rapier-loom",
        categoryId: weaving.id,
        type: "machinery",
        description:
          "Versatile rapier loom for medium to heavy fabric weaving with excellent pattern capability and low maintenance requirements.",
        specs: {
          "Reed Space": "140–220 cm",
          "Weft Insertion": "Rapier",
          Speed: "Up to 450 rpm",
        },
        images: [],
        featured: true,
        published: true,
      },
    });
  }

  if (repair) {
    const services = [
      {
        slug: "machine-repair",
        name: "Machine Repair",
        description:
          "Expert diagnosis and repair for spinning, weaving, and knitting machinery breakdowns.",
      },
      {
        slug: "preventive-maintenance",
        name: "Preventive Maintenance",
        description:
          "Scheduled maintenance programs to prevent downtime and extend machine life.",
      },
      {
        slug: "emergency-breakdown-support",
        name: "Emergency Breakdown Support",
        description:
          "24/7 rapid response team for critical production line failures.",
      },
      {
        slug: "machine-refurbishment",
        name: "Machine Refurbishment",
        description:
          "Complete overhaul and modernization of aging textile machinery.",
      },
      {
        slug: "installation-commissioning",
        name: "Installation & Commissioning",
        description:
          "Professional installation, calibration, and commissioning of new machinery.",
      },
      {
        slug: "annual-maintenance-contracts",
        name: "Annual Maintenance Contracts",
        description:
          "Comprehensive AMC packages with priority support and spare parts coverage.",
      },
    ];

    for (const svc of services) {
      await prisma.product.upsert({
        where: {
          categoryId_slug: { categoryId: repair.id, slug: svc.slug },
        },
        update: {},
        create: {
          name: svc.name,
          slug: svc.slug,
          categoryId: repair.id,
          type: "service",
          description: svc.description,
          specs: {},
          images: [],
          featured: false,
          published: true,
        },
      });
    }
  }

  const industries = [
    {
      name: "Textile Mills",
      slug: "textile-mills",
      description:
        "Complete machinery solutions for integrated textile mills — from spinning to finishing.",
      sortOrder: 1,
    },
    {
      name: "Garment Manufacturers",
      slug: "garment-manufacturers",
      description:
        "Knitting and weaving equipment tailored for apparel and garment production lines.",
      sortOrder: 2,
    },
    {
      name: "Yarn Manufacturers",
      slug: "yarn-manufacturers",
      description:
        "Spinning machinery and maintenance services for yarn production facilities.",
      sortOrder: 3,
    },
    {
      name: "Fabric Processing Units",
      slug: "fabric-processing",
      description:
        "Processing equipment and upgrades for dyeing, printing, and finishing operations.",
      sortOrder: 4,
    },
    {
      name: "Industrial Textile Producers",
      slug: "industrial-textile",
      description:
        "Heavy-duty machinery for technical textiles, geotextiles, and industrial fabrics.",
      sortOrder: 5,
    },
  ];

  for (const ind of industries) {
    await prisma.industry.upsert({
      where: { slug: ind.slug },
      update: ind,
      create: ind,
    });
  }

  const projects = [
    {
      title: "500-Spindle Ring Frame Installation",
      slug: "ring-frame-installation-surat",
      clientType: "Textile Mill",
      projectType: "installation" as const,
      summary:
        "Complete installation and commissioning of a 480-spindle ring frame for a leading Surat-based textile mill.",
      content:
        "Our team handled foundation preparation, machine alignment, trial runs, and operator training. Production started within 10 days of delivery.",
    },
    {
      title: "Rapier Loom Overhaul",
      slug: "rapier-loom-overhaul",
      clientType: "Weaving Unit",
      projectType: "repair" as const,
      summary:
        "Full refurbishment of aging rapier looms restoring 95% of original production speed.",
      content:
        "Replaced worn components, upgraded electronic controls, and recalibrated weft insertion systems.",
    },
    {
      title: "Spinning Line Efficiency Upgrade",
      slug: "spinning-line-upgrade",
      clientType: "Yarn Manufacturer",
      projectType: "upgrade" as const,
      summary:
        "Machinery upgrade increasing yarn output by 18% while reducing energy consumption.",
      content:
        "Installed modern drafting systems and optimized drive mechanisms across the production line.",
    },
  ];

  for (const proj of projects) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: proj,
      create: proj,
    });
  }

  const certifications = [
    {
      name: "ISO 9001:2015",
      issuer: "International Organization for Standardization",
      description: "Quality management system certification for manufacturing processes.",
      sortOrder: 1,
    },
    {
      name: "ISO 14001:2015",
      issuer: "International Organization for Standardization",
      description: "Environmental management system certification.",
      sortOrder: 2,
    },
    {
      name: "CE Marking",
      issuer: "European Conformity",
      description: "Compliance with European health, safety, and environmental standards.",
      sortOrder: 3,
    },
  ];

  for (const cert of certifications) {
    const existing = await prisma.certification.findFirst({
      where: { name: cert.name },
    });
    if (!existing) {
      await prisma.certification.create({ data: cert });
    }
  }

  const blogPosts = [
    {
      title: "5 Essential Textile Machinery Maintenance Tips",
      slug: "textile-machinery-maintenance-tips",
      excerpt:
        "Prevent costly breakdowns with these proven maintenance practices for spinning and weaving equipment.",
      content: `Regular maintenance is the backbone of textile production efficiency. Here are five practices every mill should follow:

## 1. Daily Lubrication Checks
Ensure all moving parts receive adequate lubrication. Dry bearings are the leading cause of spindle failure.

## 2. Belt Tension Inspection
Loose or worn belts reduce power transmission efficiency by up to 15%.

## 3. Scheduled Component Replacement
Replace wear parts (rings, travellers, reeds) on a fixed schedule rather than waiting for failure.

## 4. Vibration Monitoring
Unusual vibration often signals misalignment — address it before it damages adjacent components.

## 5. Operator Training
Well-trained operators catch early warning signs that automated systems miss.`,
      publishedAt: new Date("2025-11-15"),
    },
    {
      title: "Common Spinning Machine Failures and Solutions",
      slug: "spinning-machine-failures-solutions",
      excerpt:
        "Diagnose and resolve the most frequent spinning machinery issues to minimize production downtime.",
      content: `Spinning machines operate under demanding conditions. Understanding common failures helps reduce downtime.

## Broken Ends
Usually caused by traveller wear or improper yarn tension. Replace travellers on schedule and calibrate tension devices.

## Spindle Overheating
Check lubrication levels and bearing condition. Overheated spindles can damage yarn quality permanently.

## Drafting Roller Slippage
Clean rollers regularly and verify pressure settings. Slippage creates uneven yarn count.

## Power Fluctuations
Install voltage stabilizers to protect electronic control systems from grid instability.`,
      publishedAt: new Date("2026-01-20"),
    },
    {
      title: "Improving Machine Efficiency in Textile Mills",
      slug: "improving-machine-efficiency",
      excerpt:
        "Practical strategies to boost output and reduce energy costs across your textile production floor.",
      content: `Efficiency improvements compound over time. Start with these high-impact changes:

## Optimize Machine Speed Settings
Running machines at maximum speed isn't always optimal. Find the sweet spot for quality and throughput.

## Upgrade Legacy Controls
Modern PLCs and servo drives can improve precision and reduce waste by 10–20%.

## Implement Predictive Maintenance
Use vibration and temperature sensors to predict failures before they halt production.

## Energy Audit
Motors and compressed air systems are major energy consumers — an audit often reveals 15% savings opportunities.`,
      publishedAt: new Date("2026-03-01"),
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
