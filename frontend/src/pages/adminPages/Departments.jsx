import AddButton from "../../_components/AddButton"
import { DepartmentsTable } from "../../_components/adminComponents"

function Departments() {
    return (
        <>
            <AddButton pos='ms-auto mt-6 me-10' text='Add Department'/>
            <DepartmentsTable />
        </>
    )
}

export default Departments