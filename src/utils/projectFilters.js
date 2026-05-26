export const PROJECT_FILTERS = ["All", "Web Apps", "Mobile Apps", "Cloud Optimized"];

export function filterProjectsByCategory(projects, selectedFilter) {
  if (selectedFilter === "All") return projects;

  return projects.filter((project) => {
    if (selectedFilter === "Web Apps") {
      return project.tech.includes("React") && !project.tech.includes("React Native");
    }

    if (selectedFilter === "Mobile Apps") {
      return project.tech.includes("React Native");
    }

    if (selectedFilter === "Cloud Optimized") {
      return project.cloud.includes("AWS Lightsail") || project.cloud.includes("EC2");
    }

    return true;
  });
}
