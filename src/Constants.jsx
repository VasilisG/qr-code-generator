export const OPTIONS = {
  errorCorrectionLevel: 'H',
  type: 'image/jpeg',
  quality: 0.3,
  margin: 1,
  width: 300
}

export const CORRECTION_LEVELS = [
  {
    label: 'L (Low)',
    value: 'L',
    title: 'Error resistance: ~7%'
  },
  {
    label: 'M (Medium)',
    value: 'M',
    title: 'Error resistance: ~15%'
  },
  {
    label: 'Q (Quartile)',
    value: 'Q',
    title: 'Error resistance: ~25%'
  },
  {
    label: 'H (High)',
    value: 'H',
    title: 'Error resistance: ~30%'
  }
];

export const IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp'
];

export const DOWNLOAD_NAME = 'result_image';