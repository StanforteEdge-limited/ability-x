export function getYouTubeEmbedUrl(youtubeId: string) {
  return `https://www.youtube.com/embed/${youtubeId}`;
}

export function getYouTubeThumbnailUrl(youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

export function isPlaceholderYouTubeId(youtubeId: string) {
  return youtubeId.startsWith("placeholder");
}
