import { useMemo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function useRecipeType() {
  const { location, listen } = useHistory();
  const [pathChanged, setPathChanged] = useState(location);

  const unlisten = listen((newLocation) => setPathChanged(newLocation));
  useEffect(() => () => unlisten());

  return useMemo(
    () => (pathChanged.pathname.includes('foods') ? 'Meal' : 'Drink'), [pathChanged],
  );
}
