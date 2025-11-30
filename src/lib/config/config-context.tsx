// src/lib/config/config-context.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getIncidentTypes,
  IncidentTypeDoc,
  IncidentTypeMap,
} from "@/lib/db/master-data";

interface ConfigContextType {
  incidentTypes: IncidentTypeDoc[];
  incidentMap: IncidentTypeMap;
  loading: boolean;
  refreshConfig: () => Promise<void>;
}

const ConfigContext = createContext<ConfigContextType>({} as ConfigContextType);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [incidentTypes, setIncidentTypes] = useState<IncidentTypeDoc[]>([]);
  const [incidentMap, setIncidentMap] = useState<IncidentTypeMap>({});
  const [loading, setLoading] = useState(true);

  const loadConfig = async () => {
    try {
      const { list, map } = await getIncidentTypes();
      setIncidentTypes(list);
      setIncidentMap(map);
    } catch (error) {
      console.error("Error cargando configuración:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        incidentTypes,
        incidentMap,
        loading,
        refreshConfig: loadConfig,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => useContext(ConfigContext);
