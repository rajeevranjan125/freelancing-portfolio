export function getCloudCostEstimate(users) {
  if (users <= 1000) {
    const cost = Math.round(10 + (users - 100) * (15 / 900));
    return {
      provider: "AWS Lightsail / DigitalOcean",
      cost: `$${cost}/mo`,
      tier: "Startup Tier",
      setup: "React SPA + Java Spring Boot (packaged monolith) + Managed MySQL (1GB RAM)",
      why: "All-in-one Virtual Private Server. Bundles static frontends with minimal container footprint. Perfect for initial traction.",
      savings: "$180 - $250/mo saved"
    };
  }

  if (users <= 10000) {
    const cost = Math.round(60 + (users - 1000) * (60 / 9000));
    return {
      provider: "AWS EC2 t3.medium + RDS MySQL",
      cost: `$${cost}/mo`,
      tier: "Growth Cluster",
      setup: "S3 hosted React + Application Load Balancer + Spring Boot on EC2 with Auto-Scaling + Multi-AZ RDS",
      why: "Allows backend to scale vertically & horizontally. RDS ensures automated daily backups and decoupled compute.",
      savings: "$350 - $500/mo saved"
    };
  }

  const cost = Math.round(250 + (users - 10000) * (450 / 90000));
  return {
    provider: "AWS EKS (Kubernetes) + RDS Multi-AZ",
    cost: `$${cost}/mo`,
    tier: "Enterprise Microservices",
    setup: "Next.js Static hosting + AWS EKS Cluster running Spring Boot pods + Redis cache + RDS replicas",
    why: "Orchestrated container deployments, automatic traffic load balancing, master-replica DB setup for heavy queries.",
    savings: "$1,200 - $2,500/mo saved"
  };
}
