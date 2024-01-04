import React from 'react'
import classes from "./Profile.module.css";

const Profile = () => {
    
    return (
        <>

            <div className={classes.proCon}>
                <div className={classes.header}>
                    <div className={classes.headerDetail}>
                        <p>Welcome To Expense Tracker</p>
                        <span className={classes.incomplete}>
                            {!isLocation ? "Your Profile is incompelete." : <>Your Profile is <strong>x%</strong>complete</>}
                            <Link onClick={updateHandler}>Complete Now</Link>
                        </span>
                    </div>
                </div>
                <Button variant='danger' onClick={logoutHandler}>Log out</Button>
            </div>
            {isLocation && <UpdateProfile user={userData} />}

        </>
    )
}

export default Profile