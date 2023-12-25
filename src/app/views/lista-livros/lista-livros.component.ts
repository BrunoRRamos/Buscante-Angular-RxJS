import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, map, filter, debounceTime, catchError, throwError, of } from 'rxjs';
import { Item, LivroResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

  const PAUSA = 300;

  @Component({
    selector: 'app-lista-livros',
    templateUrl: './lista-livros.component.html',
    styleUrls: ['./lista-livros.component.css'],
  })
  export class ListaLivrosComponent {
    campoBusca = new FormControl();
    mensagemErro = '';
    livrosResultados: LivroResultado;

    constructor(private livroService: LivroService) {}

    totalLivros$ = this.campoBusca.valueChanges.pipe(
      debounceTime(PAUSA),
      filter((valorDigitado) => valorDigitado.length >= 3),
      switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
      map(resultado => this.livrosResultados = resultado),
      catchError((erro)=> {
        return of();
      })
    );


    livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
      debounceTime(PAUSA),
      filter((valorDigitado) => valorDigitado.length >= 3),
      switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
      map(resultado => resultado.items ?? []),
      map((items) => this.livrosResultado(items)),
      catchError(() => {
        return throwError(() => new Error(this.mensagemErro = 'API ERROR'))}
    ));

    livrosResultado(items: Item[]): LivroVolumeInfo[] {
      return items.map((item) => {
        return new LivroVolumeInfo(item);
      });
    }
  };
