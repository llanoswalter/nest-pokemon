import { Injectable } from '@nestjs/common';
import { PokeRosponse } from './interfaces/poke-response-interfase';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly PokemonModel = Model<Pokemon>,

    private readonly http: AxiosAdapter
  ){}

  async executeSeed(){

    await this.PokemonModel.deleteMany({});

    const data = await this.http.get<PokeRosponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    
    const pokemonToInsert: {name:string, no:number}[] = [];
    
    data.results.forEach(async ({name, url}) =>{
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      pokemonToInsert.push({name, no});
    })
    
    await this.PokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }
}
