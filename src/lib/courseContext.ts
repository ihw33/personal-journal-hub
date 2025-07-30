
// In a real application, this would dynamically import and process data.
// For this environment, we use a manually summarized string based on the weekXData.ts files.
export const getCourseContext = (): string => {
  const summary = `
    **Jeju 8-Week AI Collaboration Course Summary**

    **Week 1: First Steps in Jeju**
    - Objective: Systematically gather basic information about Jeju, understand personal travel styles, and build a framework for the travel plan.

    **Week 2: Defining Themes and Styles**
    - Objective: Based on the chosen concept, set detailed themes, and specify schedules and budgets.

    **Week 3: Designing Themed Travel**
    - Objective: Design in-depth experiences for each theme (e.g., activity, healing, culinary) and balance them.

    **Week 4: Practical Planning**
    - Objective: Systematically plan and optimize practical elements like accommodation, transportation, and budget.

    **Week 5: Itinerary Optimization**
    - Objective: Create a detailed, minute-by-minute timetable and optimize travel routes for maximum efficiency.

    **Week 6: Crisis Management & Contingency Planning**
    - Objective: Analyze all potential risks and establish response plans for any situation, including bad weather.

    **Week 7: Final Checks and Preparations**
    - Objective: Review all plans, complete a final packing checklist, and ensure everything is ready for departure.

    **Week 8: Execution and Recording**
    - Objective: Learn to make real-time adjustments during the trip and systematically record experiences to create lasting memories.
    `;
  return summary.trim().replace(/^    /gm, ''); // Remove leading spaces
};
