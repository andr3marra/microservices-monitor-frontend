// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json(

    [
      {
        "id": "Input",
        "name": "Input",
        "status": null,
        "edges": [
          {
            "target": "GW"
          }
        ]
      },
      {
          "id": "GW",
          "name": "GW",
          "status": null,
          "edges": [
            {
              "target": "catalog-service-1",
              "status": "degrated"
            },
            {
              "target": "shopping-service-1",
              "status": "healthy"
            },
            {
              "target": "catalog-service-2",
              "status": "degrated"
            },
            {
              "target": "shopping-service-2",
              "status": "healthy"
            }
          ]
        },
      {
        "id": "catalog-service-1",
        "name": "Catalog Service",
        "status": "healthy",
        "edges": []
      },
      {
        "id": "shopping-service-1",
        "name": "Catalog Service",
        "status": "healthy",
        "edges": [
          {
            "target": "payment-service-1",
            "status": "healthy"
          },
          {
            "target": "order-service-1",
            "status": "unhealthy"
          }
        ]
      },
      {
        "id": "payment-service-1",
        "name": "Payment Service",
        "status": "healthy",
        "edges": []
      },
      {
        "id": "order-service-1",
        "name": "Order Service",
        "status": "unhealthy",
        "edges": []
      },
        {
          "id": "catalog-service-2",
          "name": "Catalog Service",
          "status": "healthy",
          "edges": []
        },
        {
          "id": "shopping-service-2",
          "name": "Catalog Service",
          "status": "healthy",
          "edges": [
            {
              "target": "payment-service-2",
              "status": "healthy"
            },
            {
              "target": "order-service-2",
              "status": "unhealthy"
            }
          ]
        },
        {
          "id": "payment-service-2",
          "name": "Payment Service",
          "status": "healthy",
          "edges": []
        },
        {
          "id": "order-service-2",
          "name": "Order Service",
          "status": "unhealthy",
          "edges": []
        }
    ])
}



//healthy, unhealthy, degrated
//bezier, step and smoothstep
//input, default, output