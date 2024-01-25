import JobListItem from "./JobListItem";

export function JobList({ jobItems }) {
  return (
    <ul className="job-list">
      {jobItems?.map((jobItem, i) => (
        <JobListItem key={i} jobItem={jobItem} />
      ))}
    </ul>
  );
}

export default JobList;
