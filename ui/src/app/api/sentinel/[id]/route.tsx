import { NextRequest, NextResponse } from "next/server"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number }}
) {
  const apiUrl = process.env.API_URL
  const id = params.id
  const res = await fetch(apiUrl + `/sentinel/${id}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const jsonRes = await res.json()
  return NextResponse.json(jsonRes)
}
