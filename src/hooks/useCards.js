// src/hooks/useCards.js
import { useEffect, useState } from "react";

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function useCards(page, filters, limit = 10, search = "") {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCards() {
      setLoading(true);

      const selectedAttrs = Array.isArray(filters?.attributes)
        ? filters.attributes
        : [];
      const selectedTypes = Array.isArray(filters?.types) ? filters.types : [];

      const typeSet = new Set();
      const raceSet = new Set();
      const attrSet = new Set();

      let hasOnlyInvalid = false;
      let anyValidMapped = false;

      // ----- map tipos -----
      for (const t of selectedTypes) {
        const k = norm(t);

        if (k === "armadilha") {
          typeSet.add("Trap Card");
          anyValidMapped = true;
          continue;
        }
        if (k === "magica" || k === "mágica") {
          typeSet.add("Spell Card");
          anyValidMapped = true;
          continue;
        }
        if (k === "skill card") {
          typeSet.add("Skill Card");
          anyValidMapped = true;
          continue;
        }
        if (k === "token") {
          typeSet.add("Token");
          anyValidMapped = true;
          continue;
        }
        if (k === "counter") {
          raceSet.add("Counter");
          typeSet.add("Trap Card");
          anyValidMapped = true;
          continue;
        }
        // "monstro" é amplo -> não mapeia diretamente
        if (k === "monstro") continue;
      }

      // ----- map atributos/races/propriedades -----
      for (const a of selectedAttrs) {
        const k = norm(a);

        const ELEMENTS = {
          dark: "DARK",
          light: "LIGHT",
          earth: "EARTH",
          water: "WATER",
          fire: "FIRE",
          wind: "WIND",
          divine: "DIVINE",
          divino: "DIVINE",
        };
        if (ELEMENTS[k]) {
          attrSet.add(ELEMENTS[k]);
          anyValidMapped = true;
          continue;
        }

        const MONSTER_RACES = {
          aqua: "Aqua",
          beast: "Beast",
          "beast warrior": "Beast-Warrior",
          "creator god": "Creator God",
          cyberse: "Cyberse",
          dinosaur: "Dinosaur",
          "divine beast": "Divine-Beast",
          dragon: "Dragon",
          fairy: "Fairy",
          friend: "Fiend",
          fiend: "Fiend",
          fish: "Fish",
          insect: "Insect",
          machine: "Machine",
          plant: "Plant",
          psichic: "Psychic",
          psychic: "Psychic",
          pyro: "Pyro",
          reptile: "Reptile",
        };
        if (MONSTER_RACES[k]) {
          raceSet.add(MONSTER_RACES[k]);
          anyValidMapped = true;
          continue;
        }

        const ST_PROPS = {
          normal: "Normal",
          field: "Field",
          equip: "Equip",
          continuos: "Continuous",
          continuous: "Continuous",
          "quick-play": "Quick-Play",
          ritual: "Ritual",
          counter: "Counter",
        };
        if (ST_PROPS[k]) {
          const prop = ST_PROPS[k];
          raceSet.add(prop);
          anyValidMapped = true;

          if (prop === "Counter") {
            typeSet.add("Trap Card");
          } else if (
            prop === "Quick-Play" ||
            prop === "Field" ||
            prop === "Equip" ||
            prop === "Ritual"
          ) {
            typeSet.add("Spell Card");
          } else if (prop === "Continuous" || prop === "Normal") {
            typeSet.add("Spell Card");
            typeSet.add("Trap Card");
          }
          continue;
        }

        if (k === "effect") {
          [
            "Effect Monster",
            "Flip Effect Monster",
            "Pendulum Effect Monster",
            "Pendulum Flip Effect Monster",
            "Pendulum Tuner Effect Monster",
            "Ritual Effect Monster",
            "Synchro Pendulum Effect Monster",
            "XYZ Pendulum Effect Monster",
            "Union Effect Monster",
          ].forEach((t) => typeSet.add(t));
          anyValidMapped = true;
          continue;
        }
        if (k === "normal") {
          [
            "Normal Monster",
            "Pendulum Normal Monster",
            "Normal Tuner Monster",
          ].forEach((t) => typeSet.add(t));
          anyValidMapped = true;
          continue;
        }
        if (k === "fusion") {
          ["Fusion Monster", "Pendulum Effect Fusion Monster"].forEach((t) =>
            typeSet.add(t)
          );
          anyValidMapped = true;
          continue;
        }
        if (k === "link") {
          typeSet.add("Link Monster");
          anyValidMapped = true;
          continue;
        }
        if (k === "flip") {
          ["Flip Effect Monster", "Pendulum Flip Effect Monster"].forEach((t) =>
            typeSet.add(t)
          );
          anyValidMapped = true;
          continue;
        }
        if (k === "pendulum") {
          [
            "Pendulum Normal Monster",
            "Pendulum Effect Monster",
            "Pendulum Flip Effect Monster",
            "Pendulum Tuner Effect Monster",
            "Synchro Pendulum Effect Monster",
            "XYZ Pendulum Effect Monster",
            "Pendulum Effect Fusion Monster",
            "Pendulum Effect Ritual Monster",
          ].forEach((t) => typeSet.add(t));
          anyValidMapped = true;
          continue;
        }

        if (k === "monster" || k === "monstro" || k === "n/a") continue;
      }

      // ⚠️ Só considera "inválido" se HOUVER filtros selecionados (attrs/types).
      const hasAnyFilterSelected = selectedAttrs.length + selectedTypes.length > 0;
      if (
        hasAnyFilterSelected &&
        !anyValidMapped &&
        typeSet.size === 0 &&
        raceSet.size === 0 &&
        attrSet.size === 0
      ) {
        hasOnlyInvalid = true;
      }

      if (hasOnlyInvalid) {
        console.warn("⚠️ Apenas filtros inválidos/duplicados selecionados. Retornando vazio.");
        setCards([]);
        setLoading(false);
        return;
      }

      const params = new URLSearchParams();
      params.set("num", String(limit));
      params.set("offset", String((page - 1) * limit)); // 0-based

      // ❌ sem double-encode aqui; URLSearchParams já cuida disso
      if (search && search.trim()) {
        params.set("fname", search.trim());
      }
      if (attrSet.size > 0) params.set("attribute", Array.from(attrSet).join(","));
      if (raceSet.size > 0) params.set("race", Array.from(raceSet).join(","));
      if (typeSet.size > 0) params.set("type", Array.from(typeSet).join(","));

      const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${params.toString()}`;

      console.log("🧩 Filtros processados:", {
        attribute: Array.from(attrSet),
        race: Array.from(raceSet),
        type: Array.from(typeSet),
        search: search?.trim() || "",
      });
      console.log("🔗 URL gerada:", url);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          const errText = await res.text();
          console.error("Erro da API:", res.status, errText);
          setCards([]);
        } else {
          const data = await res.json();
          setCards(Array.isArray(data?.data) ? data.data : []);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Falha ao buscar cartas:", err);
          setCards([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCards();
    return () => controller.abort();
  }, [page, filters, limit, search]);

  return { cards, loading };
}
