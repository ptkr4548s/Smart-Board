import styles from "./about.module.css"
const About= () =>{
    return(
        <div className={styles.rectanglegrandparent}>
            <div className={styles.rectangleparent}>
                <div className={styles.rightsidecardmr}>
                    <div className={styles.smallhead}>Simple and easy to use</div>
                    <div className={styles.bigheadparent}><h1 className={styles.bighead}><p className={styles.whitehow}>Get the best</p>Sketch Book for your creativity.</h1></div>
                    <div className={styles.pointsmr}>
                        <p>Access the top 1% of talent on Upwork, and a full suit of hybrid workforce management tools. This is how innovation works now.</p>
                        <br/>
                        <p>Access expert talent to fill your skill gaps</p>
                        <br/>
                        <p>Control your workflow: hire,classify and pay your talent</p>
                        <br/>
                        <p>Partner with Upwork for end-to-end support</p>
                    </div>
                    <div style={{paddingBottom:"2em"}}>
                     <div className={styles.buttonrectangularcard}>Learn More</div>   
                    </div>
                    
                </div>
                <div className={styles.imagescardmr}>
                    <img src="https://explaineverything.com/wp-content/uploads/2019/11/11-ideas-cover-2000x1001-2000x1001.jpg"></img>
                </div>
            </div>
        </div>
    )
}

export default About