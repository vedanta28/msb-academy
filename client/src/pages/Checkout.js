import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import "../stylesheets/Courses.css";

import TotalCard from "../components/TotalCard";
import CoursesCard from "../components/CourseCard";

function Checkout() {

    const { user } = useContext(UserContext);
    const [reqCourses, setReqCourses] = useState([]);

    useEffect(() => {
        // route for checkout courses
        setReqCourses([]);
        axios.get("http://localhost:42690/api/users/checkout",
            { headers: { "Authorization": `Bearer ${user.token}` } })
            .then((res) => {
                setReqCourses(res.data.courses);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failure to Load Checkout Cart");
            });
    },[]);

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
                            <div>{TotalCard(reqCourses)}</div>

                        </>
                    )
                }
            </div >
        </div >
    );
}

export default Checkout;