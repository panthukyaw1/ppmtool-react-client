import ProjectTask from "./ProjectTask";

function Backlog(){
    return(
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="card text-center mb-2">
                        <div class="card-header bg-secondary text-white">
                            <h3>TO DO</h3>
                        </div>
                    </div>

                    <ProjectTask />
                </div>
                <div class="col-md-4">
                    <div class="card text-center mb-2">
                        <div class="card-header bg-primary text-white">
                            <h3>In Progress</h3>
                        </div>
                    </div>
                    <ProjectTask/>
                </div>
                <div class="col-md-4">
                    <div class="card text-center mb-2">
                        <div class="card-header bg-success text-white">
                            <h3>Done</h3>
                        </div>
                    </div>
                    <ProjectTask/>
                </div>
            </div>
        </div>
    )
}
export default Backlog;