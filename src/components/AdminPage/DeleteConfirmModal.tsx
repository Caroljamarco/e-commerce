import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "../ui";
import { Button } from "../ui";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName?: string;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  productName,
}: DeleteConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="delete-modal-content">
        <DialogHeader>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <AlertTriangle size={24} color="#dc2626" />
            <h2 className="text-xl font-bold">Confirmar Exclusão</h2>
          </div>
          <DialogDescription>
            Esta ação não pode ser desfeita
          </DialogDescription>
        </DialogHeader>

        <div className="delete-modal-text">
          <p>Tem certeza que deseja excluir o produto:</p>
          <p className="delete-modal-warning" style={{ marginTop: "0.5rem" }}>
            {productName || "este produto"}?
          </p>
        </div>

        <DialogFooter className="modal-actions">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
            }}
          >
            Excluir Produto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
