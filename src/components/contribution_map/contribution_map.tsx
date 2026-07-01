import React from "react";
import GitHubCalendar from "react-github-calendar";
import "./contribution_map.scss";

const ContributionMap: React.FC = () => {
  const labels = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    totalCount: '{{count}} contributions',
    legend: {
      less: 'Less',
      more: 'More',
    },
  };

  const theme = {
    light: ["#ffffff", "#c299ff", "#9f66ff", "#7a33cc", "#592699"],
    dark: ["#ffffff", "#c299ff", "#9f66ff", "#7a33cc", "#592699"],
  };

  // Show the current year and the previous one, computed at render time
  // so the calendar rolls forward automatically each January.
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1];

  // Native SVG <title> tooltip on each day square — appears on hover with
  // no extra dependency. e.g. "3 contributions on Jan 5, 2025".
  const renderBlock = (
    block: React.ReactElement,
    activity: { count: number; date: string; level: number }
  ) => {
    const date = new Date(activity.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const noun = activity.count === 1 ? "contribution" : "contributions";
    return React.cloneElement(block, {
      children: <title>{`${activity.count} ${noun} on ${date}`}</title>,
    });
  };

  return (
    <div className="contribution-map-container">
      <section className="contribution-map">
        {years.map((year) => (
          <div className="calendar-section" key={year}>
            <h3 className="year-label">/{year}</h3>
            <div className="calendar-wrapper">
              <GitHubCalendar
                username="Rauded"
                blockSize={18}
                fontSize={16}
                theme={theme}
                labels={labels}
                year={year}
                renderBlock={renderBlock}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ContributionMap;
