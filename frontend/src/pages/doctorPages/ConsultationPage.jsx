import { useParams } from "react-router-dom"
import { VideoCall } from "../../_components/doctorComponents"

const ConsultationPage = () => {
    const { patientId } = useParams()
    // console.log(patientId)
    return (
        <>
            <VideoCall patientId={patientId} />
            <div>ConsultationPage</div>
        </>
    )
}

export default ConsultationPage