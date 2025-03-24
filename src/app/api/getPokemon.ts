import { Pokemon } from "@/@types/pokemon";

const POKEMON_API = "https://pokeapi.co/api/v2";
const MAX_POKEMON = 1025;

type PokemonSpecies = {
  names: { language: { name: string }; name: string }[];
  flavor_text_entries: { language: { name: string }; flavor_text: string }[];
};

export const getRandomPokemon = async (): Promise<Pokemon | null> => {
  const randomId = Math.floor(Math.random() * MAX_POKEMON) + 1;

  try {
    const speciesRes = await fetch(
      `${POKEMON_API}/pokemon-species/${randomId}`
    );

    if (!speciesRes.ok) {
      throw new Error(`포켓몬 상세 정보 가져오기 실패: ${randomId}`);
    }

    const speciesData: PokemonSpecies = await speciesRes.json();

    const nameObj = speciesData.names.find((n) => n.language.name === "ko") ||
      speciesData.names.find((n) => n.language.name === "ja") || {
        name: "",
      };

    const descriptionObj = speciesData.flavor_text_entries.find(
      (d) => d.language.name === "ko"
    ) || { flavor_text: "" };

    const typeRes = await fetch(`${POKEMON_API}/pokemon/${randomId}`);
    if (!typeRes.ok) {
      throw new Error(`포켓몬 타입 정보 가져오기 실패: ${randomId}`);
    }

    const typeData = await typeRes.json();

    const types = await Promise.all(
      typeData.types.map(async (t: { type: { url: string } }) => {
        const typeDetailRes = await fetch(t.type.url);
        if (!typeDetailRes.ok) return { ko: "", en: "Unknown" };
        const typeDetail = await typeDetailRes.json();
        const koType = typeDetail.names.find(
          (n: { language: { name: string } }) => n.language.name === "ko"
        );
        const enType = typeDetail.names.find(
          (n: { language: { name: string } }) => n.language.name === "en"
        );
        return {
          ko: koType ? koType.name : "",
          en: enType ? enType.name : "Unknown",
        };
      })
    );

    const koTypes = types.map((type) => type.ko);
    const enTypes = types.map((type) => type.en);

    const animatedImage =
      typeData.sprites.versions["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    const noneGenerationVImage =
      typeData.sprites.other["showdown"]["front_default"];
    const defaultImage = typeData.sprites.front_default;
    const homeImage = typeData.sprites.other["home"]["front_default"];

    const image =
      animatedImage || noneGenerationVImage || defaultImage || homeImage;

    return {
      id: randomId,
      name: nameObj.name,
      description: descriptionObj.flavor_text,
      types: koTypes,
      enTypes,
      image,
    };
  } catch (error) {
    console.error("랜덤 포켓몬 데이터 요청 중 오류 발생:", error);
    return null;
  }
};
