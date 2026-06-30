import { Link } from "react-router-dom";
import "./JobCard.css";

function JobCard({ job }) {
    return (
        <article className="job-card">
            <div className="job-card-header">
                <span className="job-type">
                    {job.type}
                </span>

                <span className="job-salary">
                    {job.salary}
                </span>
            </div>

            <div className="job-card-body">
                <h3>{job.title}</h3>

                <p className="job-company">
                    {job.company}
                </p>

                <p className="job-location">
                    {job.location} • {job.modality}
                </p>
            </div>

            <div className="job-card-footer">
                <Link to={`/jobs/${job._id}`}>
                    <button type="button">
                        Ver detalhes
                    </button>
                </Link>
            </div>
        </article>
    );
}

export default JobCard;