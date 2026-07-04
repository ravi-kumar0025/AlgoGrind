import React from 'react'

export async function GET() {
    return Response.json({
        message: "Hello world ke haal h"
    }, { status: 200 })
}
