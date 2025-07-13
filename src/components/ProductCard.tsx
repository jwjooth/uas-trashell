import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import type { Product } from "./ProductDashboard";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const router = useRouter();

    return (
        <Card
            sx={{
                width: "100%",
                height: "100%",
                borderRadius: 3,
                boxShadow: 3,
                transition: "all 0.25s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-4px)",
                },
            }}
        >
            <CardMedia
                component="img"
                height="160"
                image={product.gambar}
                alt={product.nama_barang}
                sx={{
                    objectFit: "cover",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                }}
            />

            <CardContent sx={{ px: 2, py: 2 }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    noWrap
                    gutterBottom
                >
                    {product.nama_barang}
                </Typography>

                <Typography
                    variant="body1"
                    fontWeight={500}
                    color="primary"
                    sx={{ mb: 1 }}
                >
                    Rp {product.harga.toLocaleString()}
                </Typography>

                <Stack spacing={0.5} sx={{ fontSize: "13px" }}>
                    <Typography variant="caption" color="text.secondary">
                        Stok: {product.stok}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {product.kategori} • {product.kota}
                    </Typography>
                </Stack>
            </CardContent>

            <CardActions
                sx={{
                    justifyContent: "space-between",
                    px: 2,
                    pb: 2,
                    mt: "auto",
                }}
            >
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => router.push(`/dashboard/barang/edit/${product.id}`)}
                >
                    Edit
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => router.push(`/dashboard/barang/hapus/${product.id}`)}
                >
                    Hapus
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;