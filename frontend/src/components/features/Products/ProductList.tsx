import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

import type { Product } from "./Product"

interface ProductListInteface {
    products: Product[];
}


const dummyProducts: Product[] = [
    {
        id: "1",
        name: "Gaming Laptop",
        description: "A high-performance laptop for gaming.",
        price: 1500,
        imageUrl: "https://via.placeholder.com/150",
    },
    {
        id: "2",
        name: "Graphics Card",
        description: "A powerful GPU for gaming and rendering.",
        price: 700,
        imageUrl: "https://via.placeholder.com/150",
    },
    {
        id: "3",
        name: "Mechanical Keyboard",
        description: "A durable and responsive keyboard.",
        price: 120,
        imageUrl: "https://via.placeholder.com/150",
    },
];
export default function ProductList() {


    return (
        <Grid container spacing={3}>
            {dummyProducts.map((product) => (
                <Grid size={{ xs: 1, sm: 6, md: 4 }} key={product.id}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={product.imageUrl}
                            alt={product.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                            <Typography variant="subtitle1" color="text.primary" sx={{ mt: 1 }}>
                                Price: ${product.price}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))
            }
        </Grid >
    )
}