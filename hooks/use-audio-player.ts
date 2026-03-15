import { Audio } from "expo-av";
import { useEffect, useState, useCallback } from "react";

export interface AudioPlayerState {
  isPlaying: boolean;
  position: number;
  duration: number;
  playbackProgress: number;
}

export function useAudioPlayer(audioUri?: string) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    position: 0,
    duration: 0,
    playbackProgress: 0,
  });

  const onPlaybackStatusUpdate = useCallback((status: any) => {
    if (status.isLoaded) {
      setState({
        isPlaying: status.isPlaying,
        position: status.positionMillis,
        duration: status.durationMillis || 0,
        playbackProgress: status.durationMillis ? (status.positionMillis / status.durationMillis) * 100 : 0,
      });
    }
  }, []);

  const loadAudio = useCallback(async () => {
    if (!audioUri) return;
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
    } catch (error) {
      console.error("Error loading sound", error);
    }
  }, [audioUri, onPlaybackStatusUpdate]);

  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioUri]);

  const handlePlayPause = async () => {
    if (!sound) return;
    if (state.isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const handleSkip = async (amount: number) => {
    if (!sound) return;
    const newPosition = state.position + amount;
    await sound.setPositionAsync(Math.max(0, Math.min(newPosition, state.duration)));
  };

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  return {
    ...state,
    handlePlayPause,
    handleSkip,
    formatTime,
    sound,
  };
}
