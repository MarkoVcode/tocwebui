export default function Page({ params }: { params: { modelId: string } }) {
    return <h1>Hello, Models/xxxx Page! {params.modelId}</h1>
}