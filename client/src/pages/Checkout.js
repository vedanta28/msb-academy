import { useState, useContext, useEffect } from "react";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

// importing context
import { UserContext } from "../context/UserContext";
import { ReloaderContext } from "../context/Reloader";

// importing stylesheets
import "../stylesheets/Courses.css";

// importing components
import TotalCard from "../components/TotalCard";
import CoursesCard from "../components/CourseCard";

function Checkout() {

    const { user } = useContext(UserContext);
    const { reload } = useContext(ReloaderContext);
    const [reqCourses, setReqCourses] = useState([]);

    useEffect(() => {
        // route for checkout courses
        setReqCourses([]);
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/checkout`,
            { headers: { "Authorization": `Bearer ${user.token}` } })
            .then((res) => {
                setReqCourses(res.data.cart);
            })
            .catch(() => {
                toast.error("Failure to Load Checkout Cart");
            });
    }, [reload]);

    return (
        <div className="Courses">
            <div className="Heading">
                <Typography variant="h4" sx={{ fontFamily: "Open Sans" }}>
                    Check Out
                </Typography>
            </div>
            <div className="CoursesBox">
                {
                    reqCourses.length === 0 ? (
                        <>No Courses In Cart</>
                    ) : (
                        <>
                            <div>
                                {reqCourses.map((d) => (
                                    <CoursesCard key={d._id} Data={d} Checkout={true} />
                                ))}
                            </div>
                            <div>{< TotalCard Data={reqCourses} />}</div>
                        </>
                    )
                }
            </div >
        </div >
    );
}

export default Checkout;