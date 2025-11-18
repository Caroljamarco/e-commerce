import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "../ui";
import { Button, Input, Label, Textarea } from "../ui";
import type { Product } from "../../types";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, "id">) => void;
  editingProduct?: Product | null;
}

export function ProductModal({
  isOpen,
  onClose,
  onSave,
  editingProduct,
}: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "potato" as "potato" | "pasta" | "beverage",
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price.toString(),
        image: editingProduct.image,
        category: editingProduct.category,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "potato",
      });
    }
  }, [editingProduct, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      image: formData.image,
      category: formData.category,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="product-modal-content">
        <DialogHeader>
          <h2 className="text-2xl font-bold text-gradient">
            {editingProduct ? "Editar Produto" : "Adicionar Produto"}
          </h2>
          <DialogDescription>
            {editingProduct
              ? "Atualize as informações do produto"
              : "Preencha os dados do novo produto"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <Label htmlFor="name" className="form-label">
              Nome do Produto *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Ex: Batata Recheada Tradicional"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <Label htmlFor="description" className="form-label">
              Descrição *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              placeholder="Descreva os ingredientes e características do produto"
              className="form-textarea"
              rows={4}
            />
          </div>

          <div className="form-group">
            <Label htmlFor="price" className="form-label">
              Preço (R$) *
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              placeholder="0.00"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <Label htmlFor="category" className="form-label">
              Categoria *
            </Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as "potato" | "pasta" | "beverage",
                })
              }
              required
              className="form-select"
            >
              <option value="potato">🥔 Batatas Recheadas</option>
              <option value="pasta">🍝 Massas Artesanais</option>
              <option value="beverage">🥤 Refrigerantes</option>
            </select>
          </div>

          <div className="form-group">
            <Label htmlFor="image" className="form-label">
              URL da Imagem *
            </Label>
            <Input
              id="image"
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
              placeholder="https://exemplo.com/imagem.jpg"
              className="form-input"
            />
            {formData.image && (
              <div style={{ marginTop: "1rem" }}>
                <img
                  src={formData.image}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "0.5rem",
                    border: "2px solid hsl(var(--border))",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          <DialogFooter className="modal-actions">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {editingProduct ? "Salvar Alterações" : "Adicionar Produto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
