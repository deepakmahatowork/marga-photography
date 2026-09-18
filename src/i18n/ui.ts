export const languages = {
  en: 'EN',
  fr: 'FR',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.expeditions': 'Expeditions',
    'nav.portfolios': 'Portfolios',
    'nav.stories': 'Field Notes',
    'nav.commercial': 'Commercial',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.request_expedition': 'Request Expedition',
    'nav.navigation': 'NAVIGATION',
    'nav.close': 'CLOSE',
    'nav.direct_dispatch': 'Direct Dispatch',

    // Hero
    'hero.badge': 'Specialist Nepal Photography',
    'hero.title_line1': 'Where Sacred Light',
    'hero.title_line2': 'Meets Living Heritage.',
    'hero.description': "We don't build generic tours. We lead quiet, small-group visual expeditions into the deep human stories, sacred masked rituals, wild tiger corridors, and alpine sanctuaries of Nepal.",
    'hero.cta_expeditions': 'Explore Expeditions',
    'hero.cta_portfolio': 'View Portfolio',

    // Portfolios
    'portfolios.badge': 'Curated Visual Archive',
    'portfolios.title': 'The Five Realms of Nepal',
    'portfolios.all': 'Explore Complete Photographic Collection',
    'portfolios.people': 'People',
    'portfolios.culture': 'Culture',
    'portfolios.festivals': 'Festivals',
    'portfolios.wildlife': 'Wildlife',
    'portfolios.landscapes': 'Landscapes',

    // Expeditions
    'expeditions.badge': 'Field Masterclasses',
    'expeditions.title': 'Flagship Photographic Expeditions',
    'expeditions.subtitle': 'Curated itineraries strictly capped at 4 to 6 photographers. Guided by veteran Himalayan visual artists.',
    'expeditions.status': 'Field Status',
    'expeditions.inquiries_open': 'Inquiries Open',
    'expeditions.view_itinerary': 'View Itinerary',

    // Stories
    'stories.badge': 'Field Notes & Visual Stories',
    'stories.title': 'Monographs From the Margins',
    'stories.read_essay': 'Read Essay',

    // Inquiry Form
    'inquiry.badge': 'Direct Expedition Dispatch',
    'inquiry.title': 'Plan Your Nepal Photography Journey',
    'inquiry.subtitle': 'Small-group masterclasses (4–6 photographers maximum) or bespoke private fixer logistics across Nepal.',
    'inquiry.submit': 'Submit Expedition Inquiry',

    // Footer
    'footer.description': 'We create documentary and photography masterclass expeditions into the people, ancient rituals, living cultures, wilderness, and high Himalayan sanctuaries of Nepal.',
    'footer.partnership': 'Operational Partnership',
    'footer.partner_text': 'Marga Photography operates as a specialist expedition collective supported by the logistical infrastructure of Marga Adventure.',
    'footer.rights': 'All photographs and rights reserved by the respective contributing artists.',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.expeditions': 'Expéditions',
    'nav.portfolios': 'Portfolios',
    'nav.stories': 'Carnets de Terrain',
    'nav.commercial': 'Commercial',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    'nav.request_expedition': 'Demander une Expédition',
    'nav.navigation': 'NAVIGATION',
    'nav.close': 'FERMER',
    'nav.direct_dispatch': 'Contact Direct',

    // Hero
    'hero.badge': 'Photographie Spécialisée au Népal',
    'hero.title_line1': 'Où la Lumière Sacrée',
    'hero.title_line2': "Rencontre l'Héritage Vivant.",
    'hero.description': "Nous ne créons pas de circuits génériques. Nous guidons des expéditions visuelles intimes en petits groupes au cœur des histoires humaines profondes, des rituels masqués sacrés, des corridors de tigres sauvages et des sanctuaires alpins du Népal.",
    'hero.cta_expeditions': 'Explorer les Expéditions',
    'hero.cta_portfolio': 'Voir le Portfolio',

    // Portfolios
    'portfolios.badge': 'Archives Visuelles Ciblées',
    'portfolios.title': 'Les Cinq Royaumes du Népal',
    'portfolios.all': 'Explorer la Collection Photographique Complète',
    'portfolios.people': 'Peuples',
    'portfolios.culture': 'Culture',
    'portfolios.festivals': 'Festivals',
    'portfolios.wildlife': 'Faune Sauvage',
    'portfolios.landscapes': 'Himalaya',

    // Expeditions
    'expeditions.badge': 'Masterclasses de Terrain',
    'expeditions.title': 'Expéditions Photographiques Phares',
    'expeditions.subtitle': 'Itinéraires soignés strictement limités à 4 ou 6 photographes. Guidés par des artistes visuels himalayens chevronnés.',
    'expeditions.status': 'Statut du Terrain',
    'expeditions.inquiries_open': 'Inscriptions Ouvertes',
    'expeditions.view_itinerary': "Voir l'Itinéraire",

    // Stories
    'stories.badge': 'Notes de Terrain & Récits Visuels',
    'stories.title': 'Monographies des Lisières',
    'stories.read_essay': "Lire l'Essai",

    // Inquiry Form
    'inquiry.badge': 'Dépêche Directe d’Expédition',
    'inquiry.title': 'Planifiez Votre Voyage Photographique au Népal',
    'inquiry.subtitle': 'Masterclasses en petits groupes (4 à 6 photographes maximum) ou logistique sur mesure de fixeurs privés à travers le Népal.',
    'inquiry.submit': 'Envoyer la Demande d’Expédition',

    // Footer
    'footer.description': 'Nous créons des expéditions documentaires et masterclasses photographiques auprès des peuples, rituels ancestraux, cultures vivantes, faune sauvage et sanctuaires de haute altitude du Népal.',
    'footer.partnership': 'Partenariat Opérationnel',
    'footer.partner_text': 'Marga Photography opère en tant que collectif spécialisé avec le soutien logistique de Marga Adventure.',
    'footer.rights': 'Tous droits photographiques réservés par les artistes contributeurs respectifs.',
  },
} as const;

export function useTranslations(lang: Lang = 'en') {
  return function t(key: keyof (typeof ui)['en']): string {
    return ui[lang]?.[key] ?? ui[defaultLang][key] ?? key;
  };
}

export function getLocalizedPath(currentPath: string, targetLang: Lang): string {
  // Normalize
  const cleanPath = currentPath.split('?')[0].split('#')[0];
  const isCurrentlyFr = cleanPath.startsWith('/fr');
  const pathWithoutLang = isCurrentlyFr ? cleanPath.replace(/^\/fr(\/|$)/, '/') : cleanPath;
  const safePathWithoutLang = pathWithoutLang === '' ? '/' : pathWithoutLang;

  if (targetLang === 'fr') {
    return safePathWithoutLang === '/' ? '/fr' : `/fr${safePathWithoutLang}`;
  }
  return safePathWithoutLang;
}
