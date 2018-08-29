export const status = {
  ATIVO: 'active',
  DESABILITADO: 'disabled',
  ERRO: 'error',
  SUCESSO: 'success',
  ALERTA: 'warning'
};

export const tamano = {
  MINI: 'mini',
  MICRO: 'tiny',
  PEQUENO: 'small',
  NORMAL: 'standard',
  MEDIO: 'medium',
  LARGO: 'large',
  GRANDE: 'big',
  ENORME: 'huge',
  GIGANTE: 'massive'
};

export const cor = {
  VERMELHO: 'red',
  LARANJA: 'orange',
  AMARELO: 'yellow',
  OLIVE: 'olive',
  VERDE: 'green',
  TEAL: 'teal',
  AZUL: 'blue',
  VIOLETA: 'violet',
  ROXO: 'purple',
  ROSA: 'pink',
  MARROM: 'brown',
  CINZA: 'grey',
  PRETO: 'black'
};

export const fixado = { TOP: 'top', BOT: 'bottom' };

export const alinhamento_texto = { ESQUERDA: 'top', DIREITA: 'middle', CENTRO: 'bottom', JUSTIFICADO: 'justify' };

export const alinhamento_vertical = {
  TOP: 'top',
  MID: 'middle',
  BOT: 'bottom'
};

export const social = {
  VK: 'vk',
  GOOGLE: 'goole',
  YOUTUBE: 'youtube',
  TWITTER: 'twitter',
  PLUS: 'google plus',
  LINKEDIN: 'linkedin',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram'
};

export const Enum = {
  Social(val) {
    let resultado = false;
    let vetor = Object.getOwnPropertyNames(social);

    for (var i = 0; i < vetor.length; ++i) {
      resultado = vetor[i] === val || social[vetor[i]] === val;
    }
    return resultado;
  },
  Cor(val) {
    let resultado = false;
    return resultado;
  },
  Fixado(val) {
    let resultado = false;
    return resultado;
  },
  Status(val) {
    let resultado = false;
    return resultado;
  },
  Tamanho(val) {
    let resultado = false;
    return resultado;
  },
  AlinhamentoTexto(val) {
    let resultado = false;
    return resultado;
  },
  AlinhamentoVertical(val) {
    let resultado = false;
    return resultado;
  }
};
