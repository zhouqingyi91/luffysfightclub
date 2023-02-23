import { Link } from "react-router-dom"
import css from "./PageNotFound.module.css";

const PageNotFound = () => {
    return (
        <div id={css.pageNotFound}>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div>
                <Link to="/">Go to Homepage</Link>
            </div>
        </div>
    )
}

export default PageNotFound
