export const status = {
  CARREGANDO: 'loading',
  ATIVO: 'active',
  DESABILITADO: 'disabled',
  ERRO: 'error',
  SUCESSO: 'success',
  ALERTA: 'warning'
};

export const tamanho = {
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

export const tipos_input = {
  TEXTO: 'text',
  SENHA: 'password',
  NUMERO: 'number',
  AREA_TEXTO: 'textarea'
};

export const tipos_checkbox = {
  DESLIZANTE: 'slider',
  ALTERANAR: 'toggle'
};

export const Enum = {
  Input() {
    return validacao(tipos_input);
  },
  Checkbox() {
    return validacao(tipos_checkbox);
  },
  Social() {
    return validacao(social);
  },
  Cor() {
    return validacao(cor);
  },
  Fixado() {
    return validacao(fixado);
  },
  Status() {
    return validacao(status);
  },
  Tamanho() {
    return validacao(tamanho);
  },
  AlinhamentoTexto() {
    return validacao(alinhamento_texto);
  },
  AlinhamentoVertical() {
    return validacao(alinhamento_vertical);
  }
};

var validacao = function(obj) {
  return {
    validator: function(val) {
      let resultado = false;
      let vetor = Object.getOwnPropertyNames(obj);

      for (var i = 0; i < vetor.length; ++i) {
        resultado = vetor[i] === val || obj[vetor[i]] === val;
        if (resultado) {
          break;
        }
      }
      return resultado;
    }
  };
};
