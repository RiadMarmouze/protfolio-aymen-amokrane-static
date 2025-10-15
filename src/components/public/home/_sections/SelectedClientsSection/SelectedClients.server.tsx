import { SELECTED_CLIENTS_DATA } from "@/lib/data/home";
import SelectedClientsClient from "./SelectedClients.client";
import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/public/layout/Container";

export default function SelectedClientsServer() {
  return (
    <section className=" overflow-clip relative">
      <Container>
        <SectionTitle>Selected Clients</SectionTitle>
      </Container>
      <div className="border-y-2 w-screen border-black">
        <SelectedClientsClient logos={SELECTED_CLIENTS_DATA} />
      </div>
    </section>
  );
}