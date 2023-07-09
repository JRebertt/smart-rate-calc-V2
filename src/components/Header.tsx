import { Plus, X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import LogoNG from "../assets/logoNG.png";
import { NewOrderForm } from "./NewOrderForm";
import { useData } from "../context/ProductsProvider";

export function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <div className="w-48 flex items-center justify-center">
        <img src={LogoNG} alt="Habits" />
      </div>

      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className="border-2 border-custom-green font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-custom-green"
        >
          <Plus size={20} className="text-custom-green" />
          Novo Orçamento
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />

          <Dialog.Content className="absolute p-10 bg-white rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Close className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200">
              <X size={20} aria-label="Fechar" />
            </Dialog.Close>

            <Dialog.Title className="text-3xl leading-tight font-extrabold text-black">
              Criar Orçamento
            </Dialog.Title>
            <NewOrderForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
