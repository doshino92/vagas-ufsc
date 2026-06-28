import { Link } from "react-router-dom";
import "./JobCard.css";

function JobCard({ job }) {
    return (
        <article className="job-card">
            <div className="job-card-header">
                <span>{job.type}</span>
                <strong>{job.salary}</strong>
            </div>

            <div className="job-card-body">
                <h3>{job.title}</h3>

                <p>{job.company}</p>

                <p>
                    {job.location} • {job.modality}
                </p>

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